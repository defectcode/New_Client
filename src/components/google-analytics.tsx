"use client";

import React, { useEffect } from "react";

export const GoogleAnalytics: React.FC = () => {
  useEffect(() => {
    // Adaugă scriptul Google Analytics
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=YOUR_MEASUREMENT_ID`;
    document.head.appendChild(script1);

    // Inițializează Google Analytics
    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'YOUR_MEASUREMENT_ID');
    `;
    document.head.appendChild(script2);

    return () => {
      // Curăță scripturile la demontare (opțional)
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return null;
};
