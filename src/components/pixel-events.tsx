"use client";

import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const FacebookPixelEvents: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("YOUR_PIXEL_ID"); // Înlocuiește cu ID-ul Pixel-ului tău
        ReactPixel.pageView(); // Înregistrează o vizualizare a paginii
      });
  }, [pathname, searchParams]);

  return null;
};
