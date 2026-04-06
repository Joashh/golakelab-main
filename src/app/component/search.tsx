'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaDotCircle } from "react-icons/fa";
import { IoMdWater } from "react-icons/io";
import Link from 'next/link';
import { FaNewspaper } from 'react-icons/fa';

export default function LakeSearch() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query) handleSearch();
        }, 500); // wait 500ms after user stops typing

        return () => clearTimeout(timer);
    }, [query]);

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

    return (
        <div className="relative w-full max-w-lg mx-auto">
            {/* Search bar */}
            <div className="flex rounded-2xl overflow-hidden shadow-sm border backdrop-blur-sm">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search lakes..."
                    className="flex-1 px-5 py-2 md:py-3 text-xs md:text-sm text-[#09637e] dark:text-white bg-white dark:bg-gray-900 outline-none"
                />
                <button
                    onClick={handleSearch}
                    className="px-4 md:px-6 font-medium text-xs md:text-sm hover:opacity-90 transition bg-[#09637e] dark:bg-white dark:text-[#09637e] text-white cursor-pointer"
                >
                    Search
                </button>
            </div>

            {/* Loading / No results */}
            {loading && <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading...</p>}
            {!loading && query && results.length === 0 && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No results found</p>
            )}

            {/* Results dropdown */}
            {query && results.length > 0 && (
                <div className="absolute z-50 w-full mt-2 p-3 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border border-gray-200 dark:border-gray-700">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-80 overflow-y-auto scrollbar-theme">                      
                          {results.map((item) => (
                        <li
                            key={`${item.type}-${item.id}`}
                            className="flex  items-center gap-3 py-3 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-lg cursor-pointer"
                        >
                            {item.type === 'lake' && <IoMdWater className="text-[#1092ba] dark:text-[#4fd1c5] text-lg" />}
                            {item.type === 'news' && <FaNewspaper className="text-[#1092ba] dark:text-[#4fd1c5] text-lg" />}

                            <div className="flex-1 flex justify-between items-center">
                                <div className="flex flex-col items-start">
                                    <Link href={`/${item.type === 'lake' ? 'lakes' : 'news'}/${item.slug}`}>
                                        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200  truncate mx-auto ">
                                            {item.title.rendered}
                                        </h3>
                                    </Link>
                                    <p className="text-xs text-gray-400 italic mt-1">
                                        {item.type === 'lake' ? 'Lake' : 'News'}
                                    </p>
                                </div>

                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {item.date
                                        ? new Date(item.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })
                                        : ''}
                                </p>

                            </div>
                        </li>
                    ))}
                    </ul>
                </div>
            )}
        </div>
    );
}