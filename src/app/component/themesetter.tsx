'use client';
import { useEffect, useContext, ReactNode } from "react";
import { ThemeContext } from "@/app/themecontext";

interface ThemeSetterProps {
  children: ReactNode;
}

export default function ThemeSetter({ children }: ThemeSetterProps) {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme || "light");
    }
  }, [theme]);

  return <>{children}</>;
}