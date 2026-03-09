"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    const minDuration = 1100;
    const finishDuration = 360;
    const startTime = performance.now();
    let finishTimeoutId = 0;
    let hideTimeoutId = 0;
    let frameId = 0;
    let isFinishing = false;
    let finishStartTime = 0;
    let finishFrom = 0;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const setProgressValue = (value: number) => {
      const clamped = Math.max(0, Math.min(100, value));
      progressRef.current = clamped;
      setProgress(clamped);
    };

    const animate = (now: number) => {
      if (!isFinishing) {
        const elapsed = now - startTime;
        const inFlightProgress = Math.min(92, easeOutCubic(Math.min(1, elapsed / minDuration)) * 92);
        setProgressValue(inFlightProgress);
        frameId = window.requestAnimationFrame(animate);
        return;
      }

      const completion = Math.min(1, (now - finishStartTime) / finishDuration);
      const completedProgress = finishFrom + (100 - finishFrom) * easeOutCubic(completion);
      setProgressValue(completedProgress);

      if (completion < 1) {
        frameId = window.requestAnimationFrame(animate);
        return;
      }

      hideTimeoutId = window.setTimeout(() => {
        setShowLoader(false);
      }, 140);
    };

    const beginFinish = () => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, minDuration - elapsed);
      finishTimeoutId = window.setTimeout(() => {
        if (isFinishing) {
          return;
        }
        isFinishing = true;
        finishStartTime = performance.now();
        finishFrom = Math.max(progressRef.current, 92);
      }, remaining);
    };

    frameId = window.requestAnimationFrame(animate);

    if (document.readyState === "complete") {
      beginFinish();
    } else {
      window.addEventListener("load", beginFinish, { once: true });
    }

    return () => {
      window.removeEventListener("load", beginFinish);
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(finishTimeoutId);
      window.clearTimeout(hideTimeoutId);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = showLoader ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLoader]);

  const roundedProgress = Math.round(progress);
  const progressStyle = {
    "--loader-progress": `${progress.toFixed(2)}%`,
  } as CSSProperties;

  return (
    <>
      <div className={`page-loader${showLoader ? " is-visible" : ""}`} role="status" aria-live="polite">
        <div
          className="loader-progress"
          role="progressbar"
          aria-label="Page loading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={roundedProgress}
          style={progressStyle}
        >
          <div className="loader-clock" aria-hidden="true">
            <span className="loader-dot" />
            <span className="loader-hand loader-hand--minute" />
            <span className="loader-hand loader-hand--second" />
          </div>
        </div>
        <p className="loader-label">Loading</p>
        <p className="loader-percent">{roundedProgress}%</p>
      </div>
      {children}
    </>
  );
}
