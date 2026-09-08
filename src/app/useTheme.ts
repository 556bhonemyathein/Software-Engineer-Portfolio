import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "portfolio-theme";

function systemTheme(): Theme {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function storedTheme(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

function currentTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" ? "light" : "dark";
}

function apply(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
  // Keep the `.dark` class in sync for any shadcn/ui component that keys off it.
  root.classList.toggle("dark", theme === "dark");
}

/** Circular reveal from the click origin, falling back to a plain crossfade. */
function animateSwap(swap: () => void, origin?: { x: number; y: number }) {
  const root = document.documentElement;
  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const startTransition = () => {
    root.classList.add("theme-animating");
    window.setTimeout(() => root.classList.remove("theme-animating"), 520);
    swap();
  };

  const supportsVT = typeof document.startViewTransition === "function";

  if (reduced || !supportsVT || !origin) {
    startTransition();
    return;
  }

  const transition = document.startViewTransition(swap);

  const { x, y } = origin;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  transition.ready
    .then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 620,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {
      /* transition was skipped — the theme is already applied */
    });
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document === "undefined" ? "dark" : currentTheme(),
  );

  // Follow the OS until the visitor makes an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      if (storedTheme()) return;
      const next = systemTheme();
      apply(next);
      setTheme(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback((origin?: { x: number; y: number }) => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    animateSwap(() => {
      apply(next);
      setTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable — the choice just won't persist */
      }
    }, origin);
  }, []);

  return { theme, toggle };
}
