'use client';
import { useState } from "react";
import { FiShare2, FiCheck } from "react-icons/fi";

interface ShareButtonProps {
  link: string;
}

export default function ShareButton({ link }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);

    // Reset after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center cursor-pointer gap-1 px-3 py-2 text-sm font-medium rounded-lg transition
        ${copied 
          ? 'bg-[#1fc5b7] hover:bg-[#29d1c3] text-white' 
          : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
        }`}
    >
      {copied ? <FiCheck className="w-4 h-4" /> : <FiShare2 className="w-4 h-4" />}
      {copied ? "Link copied" : "Share"}
    </button>
  );
}