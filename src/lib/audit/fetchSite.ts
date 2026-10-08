import { lookup } from "node:dns/promises";
import type { LookupAddress } from "node:dns";
import { isIP } from "node:net";

export const MAX_BYTES = 2 * 1024 * 1024;
export const MAX_REDIRECTS = 3;
export const FETCH_TIMEOUT_MS = 8000;
export const USER_AGENT = "SebWebSwissCheck/1.0 (+https://sebwebswiss.ch/check-up-site-web)";

export class SsrfError extends Error {}
export class FetchError extends Error {}

const IPV6_GROUPS = 8;

const B16 = BigInt(16);
const B32 = BigInt(32);
const B48 = BigInt(48);
const B112 = BigInt(112);

function parseIPv4(s: string): number | null {
  const parts = s.split(".");
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p)) return null;
    const v = Number(p);
    if (v > 255) return null;
    n = (n << 8) | v;
  }
  return n >>> 0;
}

function parseIPv6(s: string): bigint | null {
  let str = s.replace(/^\[|\]$/g, "");
  if (isIP(str) !== 6) return null;
  const v4Tail = str.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/);
  if (v4Tail) {
    const v4part = parseIPv4(v4Tail[1]);
    if (v4part === null) return null;
    str = str.slice(0, -v4Tail[1].length) + `${(v4part >>> 16).toString(16)}:${(v4part & 0xffff).toString(16)}`;
  }
  const [leftPart, rightPart] = str.split("::");
  const left = leftPart ? leftPart.split(":") : [];
  const right = rightPart ? rightPart.split(":") : [];
  const fill = IPV6_GROUPS - left.length - right.length;
  let n = BigInt(0);
  const all = [...left, ...Array(fill).fill("0"), ...right];
  for (const group of all) {
    n = (n << B16) | BigInt("0x" + group);
  }
  return n;
}

function inRange(n: bigint, start: bigint, prefix: number, bits: number): boolean {
  const hostBits = bits - prefix;
  if (hostBits <= 0) return n === start;
  return n >> BigInt(hostBits) === start >> BigInt(hostBits);
}

const ipv4Block = [
  { start: 0x00000000, prefix: 8 }, // 0.0.0.0/8
  { start: 0x0a000000, prefix: 8 }, // 10.0.0.0/8
  { start: 0x64400000, prefix: 10 }, // 100.64.0.0/10
  { start: 0x7f000000, prefix: 8 }, // 127.0.0.0/8
  { start: 0xa9fe0000, prefix: 16 }, // 169.254.0.0/16
  { start: 0xac100000, prefix: 12 }, // 172.16.0.0/12
  { start: 0xc0a80000, prefix: 16 }, // 192.168.0.0/16
  { start: 0xe0000000, prefix: 4 }, // 224.0.0.0/4 multicast
  { start: 0xf0000000, prefix: 4 }, // 240.0.0.0/4 reserved
  { start: 0xffffffff, prefix: 32 }, // 255.255.255.255
];

function isPrivateIPv4(n: number): boolean {
  const bn = BigInt(n);
  return ipv4Block.some((b) => inRange(bn, BigInt(b.start), b.prefix, 32));
}

const ipv6Block: { start: bigint; prefix: number }[] = [
  { start: BigInt(0), prefix: 128 }, // :: (unspecified)
  { start: BigInt(1), prefix: 128 }, // ::1 (loopback)
  { start: BigInt(0xfc00) << B112, prefix: 7 }, // fc00::/7 unique local
  { start: BigInt(0xfe80) << B112, prefix: 10 }, // fe80::/10 link local
  { start: BigInt(0xff00) << B112, prefix: 8 }, // ff00::/8 multicast
];

function isPrivateIPv6(n: bigint): boolean {
  if (ipv6Block.some((b) => inRange(n, b.start, b.prefix, 128))) return true;
  // IPv4-mapped IPv6 ::ffff:a.b.c.d — bits 127..48 = 0, bits 47..32 = 0xffff
  if (n >> B48 === BigInt(0) && ((n >> B32) & BigInt(0xffff)) === BigInt(0xffff)) {
    return isPrivateIPv4(Number(n & BigInt(0xffffffff)));
  }
  return false;
}

async function resolveAndCheck(host: string, signal: AbortSignal): Promise<void> {
  const clean = host.replace(/^\[|\]$/g, "");

  // Literal IPv4
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(clean)) {
    const n = parseIPv4(clean);
    if (n === null) throw new SsrfError(`Adresse IP invalide : ${host}`);
    if (isPrivateIPv4(n)) throw new SsrfError(`Adresse interne interdite : ${host}`);
    return;
  }

  // Literal IPv6
  if (clean.includes(":")) {
    const n = parseIPv6(clean);
    if (n === null) throw new SsrfError(`Adresse IPv6 invalide : ${host}`);
    if (isPrivateIPv6(n)) throw new SsrfError(`Adresse interne interdite : ${host}`);
    return;
  }

  let addresses: LookupAddress[];
  let onAbort = () => {};
  try {
    signal.throwIfAborted();
    const aborted = new Promise<never>((_, reject) => {
      onAbort = () => reject(signal.reason);
      signal.addEventListener("abort", onAbort, { once: true });
    });
    addresses = await Promise.race([lookup(clean, { all: true, verbatim: true }), aborted]);
  } catch {
    signal.throwIfAborted();
    throw new FetchError("Impossible de résoudre le domaine.");
  } finally {
    signal.removeEventListener("abort", onAbort);
  }

  for (const a of addresses) {
    if (a.family === 4) {
      const v4 = parseIPv4(a.address);
      if (v4 === null) throw new FetchError("Adresse IPv4 invalide dans le DNS.");
      if (isPrivateIPv4(v4)) {
        throw new SsrfError(`Adresse interne interdite : ${a.address}`);
      }
    }
    if (a.family === 6) {
      const ipv6n = parseIPv6(a.address);
      if (ipv6n === null) throw new FetchError("Adresse IPv6 invalide dans le DNS.");
      if (isPrivateIPv6(ipv6n)) {
        throw new SsrfError(`Adresse interne interdite : ${a.address}`);
      }
    }
  }
}

export type SiteResponse = {
  url: string;
  finalUrl: string;
  status: number;
  html: string;
  headers: Record<string, string>;
  timeMs: number;
};

export async function fetchSite(inputUrl: string, timeoutMs: number = FETCH_TIMEOUT_MS): Promise<SiteResponse> {
  let url: URL;
  try {
    url = new URL(inputUrl);
  } catch {
    throw new FetchError("URL invalide.");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new FetchError("Seules les adresses http:// et https:// sont autorisées.");
  }
  if (url.username || url.password) {
    throw new SsrfError("URL avec identifiants interdite.");
  }
  if (!url.hostname) {
    throw new FetchError("Domaine manquant.");
  }

  let current = url.toString();
  let status = 0;
  let finalUrl = current;
  const startedAt = Date.now();
  // Une seule limite pour toute la chaîne, pas 8 secondes par redirection.
  const signal = AbortSignal.timeout(timeoutMs);

  for (let redirects = 0; redirects <= MAX_REDIRECTS; redirects++) {
    let parsed: URL;
    try {
      parsed = new URL(current);
    } catch {
      throw new FetchError("URL invalide.");
    }
    if (
      parsed.hostname === "localhost" ||
      parsed.hostname.endsWith(".localhost") ||
      parsed.hostname.endsWith(".internal") ||
      parsed.hostname.endsWith(".local")
    )
      throw new SsrfError("Nom d’hôte interne interdit.");
    if (parsed.username || parsed.password) throw new SsrfError("URL avec identifiants interdite.");
    signal.throwIfAborted();
    await resolveAndCheck(parsed.hostname, signal);
    signal.throwIfAborted();

    const res = await fetch(current, {
      redirect: "manual",
      headers: { "user-agent": USER_AGENT, accept: "text/html,application/xhtml+xml,*/*" },
      signal,
    });

    status = res.status;

    if ([301, 302, 303, 307, 308].includes(status) && res.headers.get("location")) {
      const loc = res.headers.get("location")!;
      let next: URL;
      try {
        next = new URL(loc, parsed);
      } catch {
        throw new FetchError("Redirection invalide.");
      }
      if (next.protocol !== "http:" && next.protocol !== "https:") {
        throw new FetchError("Redirection vers un protocole non autorisé.");
      }
      current = next.toString();
      finalUrl = current;
      res.body?.cancel().catch(() => {});
      if (redirects === MAX_REDIRECTS) {
        throw new FetchError("Trop de redirections.");
      }
      continue;
    }

    const contentLength = parseInt(res.headers.get("content-length") ?? "", 10);
    if (!Number.isNaN(contentLength) && contentLength > MAX_BYTES) {
      await res.body?.cancel().catch(() => {});
      throw new FetchError("Page trop volumineuse.");
    }

    if (!res.body) {
      throw new FetchError("Réponse sans contenu.");
    }

    const reader = res.body.getReader();
    const chunks: Uint8Array[] = [];
    let total = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BYTES) {
        await reader.cancel().catch(() => {});
        throw new FetchError("Page trop volumineuse.");
      }
      chunks.push(value);
    }

    const html = Buffer.concat(chunks).toString("utf8");
    const headers: Record<string, string> = {};
    res.headers.forEach((v, k) => {
      headers[k] = v;
    });

    return {
      url: inputUrl,
      finalUrl,
      status,
      html,
      headers,
      timeMs: Math.max(0, Date.now() - startedAt),
    };
  }

  throw new FetchError("Impossible de récupérer le site.");
}
