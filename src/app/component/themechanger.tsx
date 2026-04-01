'use client';
import React, { useContext, useState } from "react";
import { ThemeContext } from "@/app/themecontext";
import { CgDarkMode } from "react-icons/cg";
import { motion } from "framer-motion";

export default function ThemeChanger() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isTapped, setIsTapped] = useState(false);

  const toggleTheme = () => {
    // trigger small tap animation manually
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 300); // reset after animation

    // toggle theme
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <li
      className="flex items-center gap-2 px-3 border-b border-gray-200 dark:border-gray-700 py-2 text-sm hover:bg-black/5 transition cursor-pointer "
      onClick={toggleTheme}
    >
      <motion.span
        animate={isTapped ? { rotate: 360, scale: 0.8 } : { rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex items-center"
      >
        <CgDarkMode
          className={`h-4 w-4 md:h-5 md:w-5   ${
            theme === "light" ? "text-white md:text-[#09637e] dark:text-white hover:text-blue-900 active:text-blue-900 dark:hover:text-blue-300 dark:active:text-blue-500" : "dark:text-amber-400 hover:text-blue-900 active:text-blue-900 dark:hover:text-blue-300 dark:active:text-blue-500"
          }`}
        />
      </motion.span>
      <span>Toggle Theme</span>
    </li>
  );
}