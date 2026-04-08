// components/RelatedJournal.tsx
import React from "react";
import { LuDownload } from "react-icons/lu";
import JournalCard from "./journalcard";

type Props = {
    categoryId: number;
};

async function getJournalsByCategoryId(categoryId: number) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/wpdmpro?lake-category=${categoryId}&_embed&per_page=6`,
        { cache: "no-store" }
    );
    return res.json();
}



export default async function RelatedJournal({ categoryId }: Props) {
    const journals: any[] = await getJournalsByCategoryId(categoryId);

    if (!journals?.length) return null;
    const totalCols = 6;
    const paddedJournals = [
        ...journals,
        ...Array(Math.max(totalCols - journals.length, 0)).fill(null),
    ];

    return (
       <section className="mt-6">
      <h2 className="text-2xl mb-6">Related Journals</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {paddedJournals.map((journal, idx) => {
          if (!journal) {
            return (
              <div key={`placeholder-${idx}`} className="flex flex-col">
                <div className="aspect-2/3 rounded-xl bg-gray-100 dark:bg-gray-800" />
              </div>
            );
          }

          return <JournalCard key={journal.id} journal={journal} />;
        })}
      </div>
    </section>
    );
}