"use client";

import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_WP_URL;

export default function News() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      const res = await fetch(`${BASE_URL}/wp-json/wp/v2/news?_embed`, { cache: "no-store" });
      const data = await res.json();
      setNews(data);
      setLoading(false);
    }

    fetchNews();
  }, []);

  // --- Loading Skeleton Component ---
  const Skeleton = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${className}`} />
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-12 text-center space-y-4 rounded-xl dark:bg-gray-800 bg-gray-100">
        {loading ? (
          <>
            <Skeleton className="h-5 w-64 mx-auto rounded" />
            <Skeleton className="h-8 w-96 mx-auto rounded mt-2" />
          </>
        ) : (
          <>
            <h1 className="text-sm font-light text-gray-900 dark:text-gray-100 tracking-widest">
              WELCOME TO <span className="text-[#09637e] dark:text-[#17b1e0]">NEWS & UPDATES</span>
            </h1>
            <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Stay updated with the latest happenings on lakes, trending stories, and important announcements from our project. Explore our news portal and never miss an update!
            </h2>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto py-6 space-y-12">
        {/* Hero Section */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-96 rounded-xl w-full" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-40 rounded" />
              <Skeleton className="h-10 w-full rounded" />
              <Skeleton className="h-48 w-full rounded" />
            </div>
          </div>
        ) : (
          news.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden shadow-lg group bg-gray-50 dark:bg-gray-900">
                {news[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                  <img
                    src={news[0]._embedded["wp:featuredmedia"][0].source_url}
                    alt={news[0].title?.rendered || "Latest News"}
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="flex flex-col justify-between py-4 md:px-6 bottom-6 left-6 right-6 text-white dark:text-gray-200">
                <div>
                  <span className="flex gap-2 text-sm rounded text-gray-500 dark:text-gray-300">
                    <p className="text-[#09637e] dark:text-[#13afdf]">Latest Update</p>
                    <p>-</p>
                    {news[0].date
                      ? new Date(news[0].date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </span>

                  <h1
                    className="text-3xl md:text-4xl text-black/80 dark:text-white/80 font-bold mt-2 line-clamp-2 leading-12"
                    dangerouslySetInnerHTML={{ __html: news[0].title?.rendered || "" }}
                  />

                  <div
                    className="mt-3 text-sm md:text-base line-clamp-6 text-justify text-black dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: news[0].content?.rendered || "" }}
                  />
                </div>

                <div className="gap-2 text-black dark:text-white flex items-center text-sm">
                  {news[0]._embedded?.["wp:term"]?.[0]?.map((cat: any) => (
                    <span key={cat.id} className=" text-black/80 dark:text-white/70 rounded truncate">
                      {cat.name}
                    </span>
                  ))}

                  <h1> • </h1>

                  <Link
                    href={`/news/${news[0].slug}`}
                    className="text-[#09637e] dark:text-[#21bceb] hover:underline truncate"
                  >
                    Read Full →
                  </Link>
                </div>
              </div>
            </div>
          )
        )}

        {/* Latest News Grid */}
        <div className="flex justify-between w-full items-center">
          {loading ? (
            <>
              <Skeleton className="h-8 w-40 rounded" />
              <Skeleton className="h-8 w-32 rounded" />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-semibold">Latest News</h1>
              <h1 className="flex items-center gap-2 font-semibold text-[#09637e] dark:text-[#21bceb]">
                See all <GoArrowRight />
              </h1>
            </>
          )}
        </div>

        <div className="grid md:grid-cols-6 gap-6">
          {(loading ? Array.from({ length: 6 }) : news.slice(1)).map((post: any, index) =>
            loading ? (
              <Skeleton key={index} className="h-48 rounded-xl w-full" />
            ) : (
              <div key={post.id} className="flex flex-col h-full group">
                {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                  <img
                    src={post._embedded["wp:featuredmedia"][0].source_url}
                    alt={post.title?.rendered || "news"}
                    className="w-full h-48 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                <div className="flex flex-col flex-1 pt-3">
                  <div className="flex flex-col flex-1 text-xs text-gray-500 dark:text-gray-400">
                    <p className="truncate">
                      {post.date
                        ? new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : ""}
                      {post._embedded?.["wp:term"]?.[0]?.length > 0 && " - "}
                      {post._embedded?.["wp:term"]?.[0]?.map((cat: any, index: number) => (
                        <span key={cat.id} className="text-black/60 dark:text-white/70">
                          {cat.name}
                          {index < post._embedded["wp:term"][0].length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                  </div>

                  <div>
                    <h2
                      className="text-lg md:text-xl font-bold line-clamp-1 text-gray-900 dark:text-gray-100"
                      dangerouslySetInnerHTML={{ __html: post.title?.rendered || "Untitled" }}
                    />
                  </div>

                  <div className="mt-2 flex flex-col flex-1">
                    <div
                      className="text-xs text-gray-700 dark:text-white/50 line-clamp-4 text-justify [&_strong]:font-normal [&_b]:font-normal [&_em]:not-italic"
                      dangerouslySetInnerHTML={{ __html: post.content?.rendered || "" }}
                    />
                    <Link
                      href={`/news/${post.slug}`}
                      className="mt-3 text-blue-600 underline underline-offset-3  dark:text-blue-400 font-medium hover:underline text-sm"
                    >
                      View Full →
                    </Link>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}