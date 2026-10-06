"use client";

import { reopenConsent } from "@/lib/ga";

export function CookieSettings() {
  return (
    <button type="button" onClick={reopenConsent}>
      Gérer les cookies
    </button>
  );
}
