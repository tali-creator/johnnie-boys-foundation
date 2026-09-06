"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

    const send = async () => {
      try {
        await fetch(`${API}/api/track`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "pageview",
            path: url,
            referrer: document.referrer || null,
            userAgent: navigator.userAgent,
          }),
          keepalive: true,
        });
      } catch {
        // silently fail
      }
    };

    send();
  }, [pathname, searchParams]);

  return null;
}
