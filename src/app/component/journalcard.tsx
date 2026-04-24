"use client";

import { useState } from "react";
import JournalModal from "./journalmodal";
import { Eye, Download } from "lucide-react";
import { IoMdEye } from "react-icons/io";
import { DownloadModal } from "./DownloadModal";

export default function JournalCard({ journal, onClick }: any) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState('');

    const featured =
        journal._embedded?.["wp:featuredmedia"]?.[0]?.source_url;


    const handleDownloadClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-lg p-4 border border-slate-200 hover:border-slate-300 transition cursor-pointer"
        >
            <div className="flex items-start justify-between gap-4">

                {/* LEFT */}
                <div className="flex-1">
                    <h3
                        className="font-semibold text-slate-900 mb-1"
                        dangerouslySetInnerHTML={{ __html: journal.title.rendered }}
                    />

                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-xs font-medium">
                            {journal.download_url?.split(".").pop()?.toUpperCase()}
                        </span>

                        <div className="flex flex-wrap  items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                            <span className="flex items-center gap-1 whitespace-nowrap">
                                <Eye className="size-4 text-slate-400" />
                                {journal.download_stats?.views ?? 0} Views
                            </span>

                            <span className="flex items-center gap-1 whitespace-nowrap">
                                <Download className="size-4 text-slate-400" />
                                {journal.download_stats?.downloads ?? 0} Download(s)
                            </span>

                            <span className="whitespace-nowrap">
                                {journal.file_size ?? "—"}
                            </span>
                        </div>
                    </div>
                </div>


                <button onClick={handleDownloadClick} className="p-2 text-teal-600 hover:bg-slate-100 rounded-lg">
                    <Download className="size-5" />
                </button>
            </div>

            <DownloadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                journal={journal} // ✅ pass full journal
            />
        </div>
    );
}