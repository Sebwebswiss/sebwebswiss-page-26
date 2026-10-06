"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getConsent, sendPageView } from "@/lib/ga";

export function RouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastUrl = useRef<string | null>(null);

  useEffect(() => {
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    if (lastUrl.current === url || getConsent() !== "granted") return;

    lastUrl.current = url;
    sendPageView();
  }, [pathname, searchParams]);

  return null;
}
