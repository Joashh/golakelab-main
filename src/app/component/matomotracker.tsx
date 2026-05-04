"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function MatomoTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (window._paq) {
      window._paq.push(["setCustomUrl", pathname]);
      window._paq.push(["trackPageView"]);
    }
  }, [pathname]);

  return null;
}