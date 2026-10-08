"use client";

import Script from "next/script";
import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  configureAnalytics,
  GA_ID,
  getConsent,
  readConsent,
  sendPageView,
  serverConsentSnapshot,
  subscribeConsent,
  syncConsent,
} from "@/lib/ga";

export function RouteTracker() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, serverConsentSnapshot);
  const initialViewSent = useRef(false);

  useEffect(() => {
    syncConsent();
    if (consent !== "granted") {
      initialViewSent.current = false;
      return;
    }
    configureAnalytics();
  }, [consent]);

  function onReady() {
    if (getConsent() !== "granted" || initialViewSent.current) return;
    syncConsent();
    configureAnalytics();
    initialViewSent.current = true;
    sendPageView();
  }

  // Prvi prikaz šaljemo nakon privole i učitavanja taga. SPA navigaciju prati
  // GA4 Enhanced Measurement (history events); drugi ručni izvor bi duplirao hitove.
  return consent === "granted" ? (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      strategy="afterInteractive"
      onReady={onReady}
    />
  ) : null;
}
