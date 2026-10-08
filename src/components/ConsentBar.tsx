"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { readConsent, serverConsentSnapshot, setConsent, subscribeConsent } from "@/lib/ga";

export function ConsentBar() {
  const stored = useSyncExternalStore(subscribeConsent, readConsent, serverConsentSnapshot);

  if (stored !== "") return null;

  function choose(value: "granted" | "denied") {
    setConsent(value);
  }

  return (
    <div className="consent-bar" role="region" aria-label="Mesure d’audience">
      <p>
        Ce site utilise Google Analytics pour mesurer sa fréquentation.{" "}
        <Link href="/confidentialite">En savoir plus</Link>
      </p>
      <div className="consent-actions">
        <button type="button" onClick={() => choose("denied")}>Refuser</button>
        <button type="button" className="primary" onClick={() => choose("granted")}>Accepter</button>
      </div>
    </div>
  );
}
