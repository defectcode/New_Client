"use client";

import React, { useEffect } from "react";

export const TikTokPixel: React.FC = () => {
  useEffect(() => {
    // Adaugă scriptul TikTok Pixel
    const script = document.createElement("script");
    script.src = "https://analytics.tiktok.com/i18n/pixel/sdk.js?sdkid=YOUR_PIXEL_ID";
    script.async = true;
    document.head.appendChild(script);

    // Inițializează Pixel-ul după ce scriptul a fost încărcat
    script.onload = () => {
      window.TiktokAnalyticsObject = "ttq";
      const ttq = (window.ttq = window.ttq || { methods: [], instance: [] } as TTQ);

      ttq.methods = ["page", "track", "identify", "init", "load"];
      ttq.setAndDefer = function (method: string) {
        ttq[method] = function (...args: any[]) {
          ttq.push([method, ...args]);
        };
      };

      ttq.methods.forEach((method) => ttq.setAndDefer?.(method));
      ttq.load = function (e: any) {
        ttq.instance.push(e);
      };

      // Inițializează și urmărește evenimente
      ttq.init?.("YOUR_PIXEL_ID");
      ttq.page?.();
    };

    return () => {
      // Curăță scriptul la demontarea componentei (opțional)
      document.head.removeChild(script);
    };
  }, []);

  return null;
};
