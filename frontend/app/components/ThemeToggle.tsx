import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  } else {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme | null) ?? null;
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
      return;
    }
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initial: Theme = prefersDark ? "dark" : "light";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="テーマ切替"
      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-900"
    >
      {theme === "dark" ? (
        <span className="inline-flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M21.64 13A9 9 0 1 1 11 2.36 7 7 0 1 0 21.64 13Z" />
          </svg>
          ダーク
        </span>
      ) : (
        <span className="inline-flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.8 1.8-1.8zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zM1 21h3v-2H1v2zm16.24-16.16l1.8-1.8-1.79-1.79-1.8 1.79 1.79 1.8zM20 13h3v-2h-3v2zm-8-9h2V1h-2v3zm6.24 14.16l1.79 1.8 1.8-1.8-1.8-1.79-1.79 1.79zM12 7a5 5 0 100 10 5 5 0 000-10z" />
          </svg>
          ライト
        </span>
      )}
    </button>
  );
}
