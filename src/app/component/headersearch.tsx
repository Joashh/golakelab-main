'use client';
import { useState, useRef, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { FaDotCircle } from "react-icons/fa";
import { IoMdWater } from "react-icons/io";

export default function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch results
  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/lake?search=${encodeURIComponent(query)}&_embed`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setResults([]);
    }
    setLoading(false);
  };

  // Debounce typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) handleSearch();
      else setResults([]);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div ref={containerRef} className="relative flex items-center">
      {/* Search Icon */}
      {!open && (
        <div
          className="inline-flex items-center justify-center rounded-full p-2 lg:p-3 bg-[#EBF4F6] dark:bg-gray-800 dark:shadow-md dark:border dark:border-gray-800 cursor-pointer transition"
          onClick={() => setOpen(true)}
        >
          <IoSearch className="text-[#09637E] dark:text-white" />
        </div>
      )}

      {/* Expanding Input */}
      <div
        className={`relative transition-all duration-300 ${
          open ? "w-40 xl:w-60 4xl:w-96 ml-2 opacity-100" : "w-0 opacity-0 ml-0"
        }`}
      >
        {open && (
          <div className="flex relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search lakes..."
              className="w-full px-4 py-2 rounded-xl border text-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />

            {/* Results Dropdown */}
            {query && (
              <div className="absolute top-full right-0  w-66 md:w-66 xl:w-100 mt-2 p-2 rounded-xl bg-white/80 dark:bg-gray-900/75 backdrop-blur-md shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-64 overflow-y-auto">
                {loading && <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>}
                {!loading && results.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No results found</p>
                )}
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {results.map((lake) => (
                    <li
                      key={lake.id}
                      className="flex items-center justify-between gap-3 py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-lg cursor-pointer"
                      onClick={() => window.location.href = `/lakes/${lake.slug}`}
                    >
                      <div className="flex items-center gap-2">
                        <IoMdWater className="text-[#1092ba] dark:text-[#4fd1c5] text-sm" />
                        <h3 className="text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                          {lake.title.rendered}
                        </h3>
                      </div>
                      {lake.acf?.barangay?.value && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {lake.acf.barangay.value}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}