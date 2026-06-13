"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "aali-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(current);
  }, []);

  useEffect(() => {
    if (theme === null) {
      return;
    }

    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const toggle = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  // Reserve the space during SSR / before hydration to avoid layout shift
  if (theme === null) {
    return (
      <span
        className="theme-toggle theme-toggle-placeholder"
        aria-hidden="true"
      />
    );
  }

  const isLight = theme === "light";

  return (
    <button
      type="button"
      className={`theme-toggle${isLight ? " is-light" : ""}`}
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      <span
        className="theme-toggle-icon theme-toggle-icon-sun"
        aria-hidden="true"
      >
        <Sun size={14} strokeWidth={2.4} />
      </span>
      <span
        className="theme-toggle-icon theme-toggle-icon-moon"
        aria-hidden="true"
      >
        <Moon size={14} strokeWidth={2.4} />
      </span>
      <span className="theme-toggle-thumb" aria-hidden="true" />
    </button>
  );
}
