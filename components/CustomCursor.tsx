"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringRefPos = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const handleMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouseRef.current.x - 4}px`;
        cursorRef.current.style.top = `${mouseRef.current.y - 4}px`;
      }
    };

    const handleEnter = () => setHovering(true);
    const handleLeave = () => setHovering(false);

    const interactiveElements = Array.from(document.querySelectorAll("a, button"));
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleEnter);
      element.addEventListener("mouseleave", handleLeave);
    });

    let frameId = 0;
    const animateRing = () => {
      ringRefPos.current.x += (mouseRef.current.x - ringRefPos.current.x) * 0.12;
      ringRefPos.current.y += (mouseRef.current.y - ringRefPos.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringRefPos.current.x}px`;
        ringRef.current.style.top = `${ringRefPos.current.y}px`;
      }

      frameId = window.requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", handleMove);
    frameId = window.requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.cancelAnimationFrame(frameId);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleEnter);
        element.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div className={`cursor${hovering ? " is-hover" : ""}`} ref={cursorRef} />
      <div className={`cursor-ring${hovering ? " is-hover" : ""}`} ref={ringRef} />
    </>
  );
}
