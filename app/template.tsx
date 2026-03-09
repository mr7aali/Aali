"use client";

import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const minDuration = 1100;
    const startTime = performance.now();
    let timeoutId = 0;

    const hideLoader = () => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, minDuration - elapsed);
      timeoutId = window.setTimeout(() => {
        setShowLoader(false);
      }, remaining);
    };

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader, { once: true });
    }

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("load", hideLoader);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = showLoader ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLoader]);

  return (
    <>
      <div className={`page-loader${showLoader ? " is-visible" : ""}`} role="status" aria-live="polite">
        <div className="loader-clock" aria-hidden="true">
          <span className="loader-dot" />
          <span className="loader-hand loader-hand--minute" />
          <span className="loader-hand loader-hand--second" />
        </div>
        <p className="loader-label">Loading</p>
      </div>
      {children}
    </>
  );
}
