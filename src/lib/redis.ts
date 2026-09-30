import { Redis } from "@upstash/redis";
import type { CheckResult } from "@/content/audit/checks";
import type { AuditScore } from "./audit/score";
import type { Priority } from "./audit/prioritize";

export type StoredAudit = {
  id: string;
  url: string;
  lang: string;
  score: AuditScore;
  checks: CheckResult[];
  priorities: Priority[];
  createdAt: string;
};

export type StoredLead = {
  id: string;
  auditId: string;
  email: string;
  consent: boolean;
  lang: string;
  createdAt: string;
};

const AUDIT_TTL = 60 * 60 * 24 * 7; // 7 jours
const LEAD_TTL = 60 * 60 * 24 * 365; // 1 an

const url =
  process.env.UPSTASH_REDIS_REST_URL || process.env.STORAGE_KV_REST_API_URL || undefined;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.STORAGE_KV_REST_API_TOKEN || undefined;

const isProduction = process.env.NODE_ENV === "production";
const redisIsConfigured = Boolean(url && token);

export class StorageUnavailableError extends Error {
  constructor() {
    super("Storage is not configured.");
    this.name = "StorageUnavailableError";
  }
}

function requireStorageAvailability() {
  if (isProduction && !redisIsConfigured) {
    throw new StorageUnavailableError();
  }
}

function createRedis(): Redis | null {
  if (!url || !token) return null;
  return new Redis({ url, token });
}

let redis: Redis | null | undefined;
function getRedis(): Redis | null {
  if (redis === undefined) redis = createRedis();
  return redis;
}

function createMemoryStore() {
  const audits = new Map<string, StoredAudit>();
  const leads = new Map<string, StoredLead>();
  const counters = new Map<string, { n: number; exp: number }>();

  return {
    async getAudit(id: string) {
      return audits.get(id) ?? null;
    },
    async setAudit(id: string, audit: StoredAudit) {
      audits.set(id, audit);
    },
    async getLead(id: string) {
      return leads.get(id) ?? null;
    },
    async setLead(id: string, lead: StoredLead) {
      leads.set(id, lead);
    },
    async incrTrip(key: string, ttl: number) {
      const now = Date.now();
      const cur = counters.get(key);
      if (!cur || cur.exp < now) {
        counters.set(key, { n: 1, exp: now + ttl });
        return 1;
      }
      cur.n += 1;
      return cur.n;
    },
  };
}

type MemoryStore = ReturnType<typeof createMemoryStore>;

const g = globalThis as unknown as { __memoryStore?: MemoryStore };
const memory: MemoryStore = g.__memoryStore ?? (g.__memoryStore = createMemoryStore());

export async function saveAudit(audit: StoredAudit): Promise<void> {
  requireStorageAvailability();
  const r = getRedis();
  if (!r) {
    await memory.setAudit(audit.id, audit);
    return;
  }
  await r.set(`audit:${audit.id}`, audit, { ex: AUDIT_TTL });
}

export async function getAudit(id: string): Promise<StoredAudit | null> {
  requireStorageAvailability();
  const r = getRedis();
  if (!r) return memory.getAudit(id);
  try {
    const data = await r.get<StoredAudit>(`audit:${id}`);
    return data ?? null;
  } catch {
    return null;
  }
}

export async function saveLead(lead: StoredLead): Promise<void> {
  requireStorageAvailability();
  const r = getRedis();
  if (!r) {
    await memory.setLead(lead.id, lead);
    return;
  }
  await r.set(`lead:${lead.id}`, lead, { ex: LEAD_TTL });
}

export async function getLead(id: string): Promise<StoredLead | null> {
  requireStorageAvailability();
  const r = getRedis();
  if (!r) return memory.getLead(id);
  try {
    const data = await r.get<StoredLead>(`lead:${id}`);
    return data ?? null;
  } catch {
    return null;
  }
}

export type RateBucket = "hour" | "day";

export async function consumeRate(ip: string, host: string, bucket: RateBucket): Promise<number> {
  requireStorageAvailability();
  const key = `audit:rate:${bucket}:${ip}:${host}`;
  const ttl = bucket === "hour" ? 3600 : 86400;
  const r = getRedis();
  if (!r) {
    return memory.incrTrip(key, ttl * 1000);
  }
  const count = await r.incr(key);
  if (count === 1) {
    await r.expire(key, ttl);
  }
  return count;
}

export { redisIsConfigured };