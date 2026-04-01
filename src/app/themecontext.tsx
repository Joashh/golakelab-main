"use client";
import { createContext, useEffect, useState, ReactNode } from "react";

// 1. Define the type for the context
interface ThemeContextType {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

// 2. Create context with default values
export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

// 3. Define the props type for the provider
interface ThemeProviderProps {
  children: ReactNode;
}

// 4. Create the ThemeProvider component
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Access localStorage only on client
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (storedTheme) setTheme(storedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};