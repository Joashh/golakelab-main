'use client';
import { useState, useRef, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { FaDotCircle, FaNewspaper } from "react-icons/fa";
import { IoMdWater } from "react-icons/io";
import Link from "next/link";

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

    // Fetch lakes
    const lakeRes = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/lake?search=${encodeURIComponent(query)}&_embed`
    );
    const lakes = await lakeRes.json();

    // Fetch news
    const newsRes = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/news?search=${encodeURIComponent(query)}&_embed`
    );
    const news = await newsRes.json();

    // Merge results with a type field
    const merged = [
      ...lakes.map((item: any) => ({ ...item, type: 'lake' })),
      ...news.map((item: any) => ({ ...item, type: 'news' })),
    ];

    setResults(merged);
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
        className={`relative transition-all duration-300 ${open ? "w-40 xl:w-60 4xl:w-96 ml-2 opacity-100" : "w-0 opacity-0 ml-0"
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
            {query && results.length > 0 && (
              <div className="absolute  overflow-y-auto scrollbar-theme top-full right-0  w-66 md:w-66 xl:w-100 mt-2 p-2 rounded-xl bg-white/80 dark:bg-gray-900/75 backdrop-blur-md shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-64 overflow-y-auto">
                {loading && <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>}
                {!loading && results.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No results found</p>
                )}
                <ul className="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto scrollbar-theme">
                  {results.map((item) => (
                    <li
                      key={`${item.type}-${item.id}`}
                      className="flex items-center gap-3 py-3 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-lg cursor-pointer"
                    >
                      {/* Left: Icon + Title/Type */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Icon */}
                        {item.type === 'lake' && <IoMdWater className="text-[#1092ba] dark:text-[#4fd1c5] text-lg shrink-0" />}
                        {item.type === 'news' && <FaNewspaper className="text-[#1092ba] dark:text-[#4fd1c5] text-lg shrink-0" />}

                        {/* Title + Type */}
                        <div className="flex flex-col min-w-0">
                          <Link href={`/${item.type === 'lake' ? 'lakes' : 'news'}/${item.slug}`}>
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                              {item.title.rendered}
                            </h3>
                          </Link>
                          <p className="text-xs text-gray-400 truncate">
                            {item.type === 'lake' ? 'Lake' : 'News'}
                          </p>
                        </div>
                      </div>

                      {/* Right info: barangay or date */}
                      <div className="text-xs text-gray-500 dark:text-gray-400 shrink-0 ml-2">
                        {item.type === 'lake'
                          ? item.acf?.barangay?.value
                          : item.date
                            ? new Date(item.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                            : null
                        }
                      </div>
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