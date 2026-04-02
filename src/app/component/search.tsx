'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaDotCircle } from "react-icons/fa";
import { IoMdWater } from "react-icons/io";

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

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/lake?search=${encodeURIComponent(query)}&_embed`
        );
        const data = await res.json();
        setResults(data);
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
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-80 overflow-y-auto">
                        {results.map((lake) => (
                            <li
                                key={lake.id}
                                className="flex items-center justify-between gap-3 py-3 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-lg cursor-pointer"
                                onClick={() => (window.location.href = `/lakes/${lake.slug}`)}
                            >
                                <div className="flex items-center gap-3">
                                    <IoMdWater className="text-[#1092ba] dark:text-[#4fd1c5] text-lg" />
                                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                        {lake.title.rendered}
                                    </h3>
                                </div>
                                {lake.acf?.barangay?.value && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {lake.acf.barangay.value}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}