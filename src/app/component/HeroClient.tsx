"use client";

import { motion } from "framer-motion";

export default function HeroClient({ text}: { text: string }) {
  return (
    <motion.div className="text-xl xl:text-3xl text-[#09637e] dark:text-white 2xl::text-4xl font-bold mb-4 max-w-5xl leading-tight"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {text}
    </motion.div>
  );
}