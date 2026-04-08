"use client";

import { useState } from "react";
import JournalModal from "./journalmodal";
import { LuEye, LuDownload } from "react-icons/lu";
import { IoMdEye } from "react-icons/io";

export default function JournalCard({ journal }: any) {
    const [open, setOpen] = useState(false);
    const [stats, setStats] = useState({
        views: journal.download_stats?.views ?? 0,
        downloads: journal.download_stats?.downloads ?? 0
    });

    // Track view when modal opens
    const handleOpen = async () => {
        setOpen(true);
        
      
    };

    // This will be called from the modal when download happens
    const handleDownloadComplete = async () => {
        // Fetch the updated download count
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/wpdmpro/${journal.id}`
            );
            const updatedJournal = await response.json();
            setStats(prev => ({ 
                ...prev, 
                downloads: updatedJournal.download_stats?.downloads ?? prev.downloads + 1 
            }));
        } catch (error) {
            // Optimistic update if fetch fails
            setStats(prev => ({ ...prev, downloads: prev.downloads + 1 }));
        }
    };

    const featured = journal._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

    return (
        <>
            <div className="group flex flex-col">
                <div
                    className="aspect-2/3 rounded-xl overflow-hidden cursor-pointer"
                    onClick={handleOpen}
                >
                    {featured ? (
                        <img
                            src={featured}
                            alt={journal.title.rendered}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                    ) : (
                        <>
                            <img
                                src="/images/blank.png"
                                className="w-full h-full object-cover dark:hidden"
                                alt="Placeholder"
                            />
                            <img
                                src="/images/blankdark.png"
                                className="w-full h-full object-cover hidden dark:block"
                                alt="Placeholder"
                            />
                        </>
                    )}
                </div>

                <h3
                    className="mt-2 text-sm font-medium line-clamp-1 text-gray-800 dark:text-white"
                    dangerouslySetInnerHTML={{ __html: journal.title.rendered }}
                />

                <div className="flex gap-2 text-xs text-gray-500 dark:text-white/50 mt-1 ">
                    <span className="flex gap-1 items-center"><IoMdEye className="text-[#09637e] dark:text-[#11b8ea]"/>{stats.views} </span>
                    <span className="flex gap-1 items-center"><LuDownload className="text-[#09637e] dark:text-[#11b8ea]"/> {stats.downloads} </span>
                </div>
            </div>

            {open && (
                <JournalModal
                    journal={journal}
                    onClose={() => setOpen(false)}
                    onDownload={handleDownloadComplete}
                />
            )}
        </>
    );
}