"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/ga";

const CTA_TEXT = /demander un devis|me contacter|réserver un appel|parler de votre projet|envoyer ma demande/i;

export function EventTracker() {
  const router = useRouter();
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const el = target?.closest<HTMLElement>("a, button");
      if (!el) return;

      const href = el instanceof HTMLAnchorElement ? el.href : "";
      const text = (el.textContent ?? "").replace(/\s+/g, " ").replace(/\s*↗\s*$/, "").trim().slice(0, 60);

      if (href.startsWith("tel:")) {
        trackEvent("contact_phone_click", { phone_number: href.replace(/^tel:/, "") });
        return;
      }
      if (href.startsWith("mailto:")) {
        trackEvent("email_click", { link_url: href });
        return;
      }
      let link: URL | null = null;
      try {
        link = href ? new URL(href) : null;
      } catch {
        return;
      }
      const contactLink = link?.origin === window.location.origin && link.pathname === "/contact";
      if (contactLink || CTA_TEXT.test(text)) {
        trackEvent("cta_click", { button_name: text, link_url: href || window.location.href });
        if (
          contactLink && link && el instanceof HTMLAnchorElement &&
          !event.defaultPrevented && event.button === 0 &&
          !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey &&
          !el.hasAttribute("download") && (!el.target || el.target === "_self")
        ) {
          // Native reloads can discard a batched click event. Keep contact CTAs
          // in the App Router; modified/new-tab clicks retain browser behavior.
          event.preventDefault();
          router.push(link.pathname + link.search + link.hash);
        }
        return;
      }
      if (link && /^https?:$/.test(link.protocol) && link.origin !== window.location.origin) {
        trackEvent("outbound_click", { link_url: href });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return null;
}
