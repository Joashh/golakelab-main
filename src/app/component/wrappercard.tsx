// components/LakesGrid.tsx
'use client';

import { useState } from 'react';
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import LakeCard from './lakegrid';

interface Lake {
  id: number;
  title: { rendered: string };
  slug: string;
  excerpt?: { rendered: string };
  content?: { rendered: string };
  acf?: any;
  _embedded?: any;
}

export default function LakesGrid({ lakes }: { lakes: Lake[] }) {
  const [expanded, setExpanded] = useState(false);

  const shouldCollapse = lakes.length > 3;

  return (
    <div className="relative flex flex-col gap-6">

      {/* Animated Grid Container */}
      <div
        className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
          shouldCollapse && !expanded ? 'max-h-[540px]' : 'max-h-[2000px]'
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lakes.map((lake) => (
            <LakeCard key={lake.id} lake={lake} />
          ))}
        </div>

        {/* Bottom Blur */}
        {shouldCollapse && !expanded && (
          <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none bg-linear-to-t from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 dark:to-transparent " />
        )}
      </div>

      {/* Toggle Button */}
      {shouldCollapse && (
        <div className="flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer  transition"
          >
            {expanded ? 'Show Less' : 'See Full'}

            <MdOutlineKeyboardDoubleArrowDown
              className={`text-xl transition-transform duration-300 ${
                expanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
}