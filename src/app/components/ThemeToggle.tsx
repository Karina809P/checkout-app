"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: "var(--color-accent)",
        color: "var(--color-bg)",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: 6,
        cursor: "pointer",
        marginBottom: "1rem",
      }}
      aria-label="Toggle theme"
    >
      {theme === "light" ? " Світла тема" : "Темна тема"}
    </button>
  );
}
