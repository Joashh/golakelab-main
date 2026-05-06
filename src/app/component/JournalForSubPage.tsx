// components/JournalGrid.tsx
"use client";

import { useState } from "react";
import { Download, Eye } from "lucide-react";
import { DownloadModal } from "./DownloadModal";
import he from "he";


export default function JournalForSubPage({ journals }: { journals: any[] }) {
    const [selectedJournal, setSelectedJournal] = useState<any>(null);
    const [open, setOpen] = useState(false);

    function handleOpen(journal: any) {
        setSelectedJournal(journal);
        setOpen(true);
    }

    return (
        <>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {journals.map((journal) => {
                    const image =
                        journal._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                        "/images/blank.png";

                    return (
                        <div
                            key={journal.id}
                            onClick={() => handleOpen(journal)}
                            className="group cursor-pointer bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            {/* Image */}
                            <div className="relative w-full h-56 overflow-hidden">
                                <img
                                    src={image}
                                    alt={he.decode(journal.title?.rendered || "Journal")}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                                {/* File info badge */}
                                <div className="absolute top-3 right-3 bg-black/70 text-white text-[12px] px-2 py-1 rounded-md backdrop-blur">
                                    <span className="flex  gap-1 items-center">
                                        {journal.download_url?.split(".").pop()?.toUpperCase()}
                                        {journal.file_size && <span>• {journal.file_size}</span>}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col gap-2">
                                {/* Title + Date */}
                                <div>
                                    <h2 className="text-sm font-semibold text-gray-900 line-clamp-1 leading-snug">
                                        {he.decode(journal.title?.rendered || "Untitled")}
                                    </h2>

                                    <p className="text-xs text-gray-500 mt-1">
                                        {journal.date
                                            ? new Date(journal.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })
                                            : "No date"}
                                    </p>
                                </div>

                                {/* Meta badges */}
                                <div className="flex gap-2 flex-wrap mt-2">
                                    {journal.download_stats?.downloads > 0 && (
                                        <div className="flex items-center gap-1 text-[11px] bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
                                            <Download className="size-3" />
                                            {journal.download_stats.downloads}
                                        </div>
                                    )}

                                    {journal.download_stats?.views > 0 && (
                                        <div className="flex items-center gap-1 text-[11px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md">
                                            <Eye className="size-3" />
                                            {journal.download_stats.views}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Terms of Use</h2>
                <div className="prose max-w-none text-slate-700 space-y-3">
                    <p>
                        By downloading materials from GoLake Lab, you agree to the following terms:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>All materials are provided for educational, research, and conservation purposes only.</li>
                        <li>Proper attribution must be given when using or citing GoLake Lab resources.</li>
                        <li>Commercial use of datasets and publications requires prior written permission.</li>
                        <li>Downloaded materials should not be redistributed without authorization.</li>
                        <li>Users are encouraged to share their research findings and contributions back to the community.</li>
                    </ul>
                    <p className="mt-4 text-sm text-slate-600">
                        For questions about data usage, collaboration opportunities, or to request specific datasets, please contact us through the About page.
                    </p>
                </div>
            </div>



            {/* Modal */}
            <DownloadModal
                isOpen={open}
                onClose={() => setOpen(false)}
                journal={selectedJournal}
            />

        </>
    );
}