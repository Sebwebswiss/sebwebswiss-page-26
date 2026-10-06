"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/ga";

const CTA_TEXT = /demander un devis|me contacter|réserver un appel|parler de votre projet|envoyer ma demande/i;

export function EventTracker() {
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
      if (CTA_TEXT.test(text)) {
        trackEvent("cta_click", { button_name: text, link_url: href || window.location.href });
        return;
      }
      if (href && !href.startsWith(window.location.origin)) {
        trackEvent("outbound_click", { link_url: href });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
