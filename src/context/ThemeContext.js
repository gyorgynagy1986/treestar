"use client";

import React, { createContext, useState, useLayoutEffect, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      console.log("Stored theme:", storedTheme); // Debug
      if (storedTheme) {
        return storedTheme === "dark";
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        console.log("System prefers dark mode:", prefersDark); // Debug
        return prefersDark;
      }
    }
    return false;
  });

  useLayoutEffect(() => {
    const root = document.body;
    console.log("Applying theme:", isDarkMode ? "dark" : "light"); // Debug
    if (isDarkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    console.log("Listening to system theme changes..."); // Debug
    const handleChange = (e) => {
      const prefersDark = e.matches;
      console.log("System theme changed. Prefers dark:", prefersDark); // Debug
      setIsDarkMode(prefersDark);
      localStorage.setItem("theme", prefersDark ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    console.log("Toggling theme. Current:", isDarkMode ? "dark" : "light"); // Debug
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
