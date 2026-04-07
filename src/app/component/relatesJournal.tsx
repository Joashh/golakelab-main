// components/RelatedJournal.tsx
import React from "react";
import { LuDownload } from "react-icons/lu";

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

    return (
        <section className="mt-6">
            <h2 className="text-2xl  mb-6">Related Journals</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {journals.map((journal) => {

                    const image =
                        journal._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                        "/images/blank.png";

                    const featured = journal?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

                    return (
                        <div
                            key={journal.id}
                            className="group flex flex-col"
                        >
                            <div className="aspect-2/3 rounded-xl overflow-hidden">
                                {featured ? (
                                    <img
                                        src={featured}
                                        alt={journal.title.rendered}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                    />
                                ) : (
                                    <>
                                        {/* Light mode placeholder */}
                                        <img
                                            src="/images/blank.png"
                                            className="w-full h-full object-cover dark:hidden"
                                            alt="placeholder"
                                        />

                                        {/* Dark mode placeholder */}
                                        <img
                                            src="/images/blankdark.png"
                                            className="w-full h-full object-cover hidden dark:block"
                                            alt="placeholder"
                                        />
                                    </>
                                )}
                            </div>


                            {/* Title */}
                            <h3
                                className="mt-2 text-sm font-medium line-clamp-1 text-gray-800 dark:text-white group-hover:text-teal-600 transition"
                                dangerouslySetInnerHTML={{
                                    __html: journal.title.rendered,
                                }}
                            />

                            {/* Download */}
                            {journal.download_url && (
                                <a
                                    href={journal.download_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs flex gap-1 items-center text-teal-600 font-semibold mt-1 hover:underline"
                                >
                                    <LuDownload />
                                    Download
                                </a>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}