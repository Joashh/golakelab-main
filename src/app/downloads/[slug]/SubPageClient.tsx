"use client";

import { useState, useMemo } from "react";
import { SearchBar } from "@/app/component/SearchBar";
import { FilterBar } from "@/app/component/FilterBar";
import { SquareArrowRightExit } from "lucide-react";
import JournalForSubPage from "@/app/component/JournalForSubPage";
import he from "he";
import ProgressLink from "@/app/component/progresslink";
export default function SubPageClient({ journallist }: { journallist: any[] }) {
    const [searchQuery, setSearchQuery] = useState("");



    const filteredJournals = useMemo(() => {
        return journallist.filter((journal) => {
            const title = journal.title?.rendered?.toLowerCase() || "";

            const matchesSearch = title.includes(searchQuery.toLowerCase());


            return matchesSearch
        });
    }, [journallist, searchQuery]);

    return (
        <>
            {/* Header */}
            <div className="mb-8">

                <div className="flex items-center gap-2 mb-3 ">

                    <p className="text-white font-semibold  rounded-full shadow-md flex justify-center items-center w-10 h-10 text-center  bg-blue-500">
                        {filteredJournals.length < 99 ? (filteredJournals.length) : (<span>99+</span>)}
                    </p>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {journallist.length > 0 && journallist[0]?._embedded?.["wp:term"]?.[0]?.[0]?.name
                            ? he.decode(journallist[0]._embedded["wp:term"][0][0].name)
                            : "Publications"}
                    </h1>



                </div>

                <p className="text-black/50 text-sm">
                    All downloads require user information for access tracking and research purposes. Your data will be kept confidential and used only for internal analytics.
                </p>
            </div>


            <div className="mb-8">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Results */}
            {filteredJournals.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <div className="text-gray-400 mb-2">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <p className="text-gray-500">No publications found in this category.</p>
                </div>
            ) : (

                <JournalForSubPage journals={filteredJournals} />
            )}
            <ProgressLink href="/downloads" className="flex justify-center pt-8 gap-2 items-center">
                <h1 className="text-red-500">Back to Downloads Page</h1>
                <SquareArrowRightExit className="text-red-500" />
            </ProgressLink>
        </>
    );
}