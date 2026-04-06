import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

const BASE_URL = process.env.NEXT_PUBLIC_WP_URL;

async function getNews() {
    const res = await fetch(`${BASE_URL}/wp-json/wp/v2/news?_embed`, {
        cache: "no-store",
    });
    return res.json();
}

export default async function News() {
    const news = await getNews();

    return (
        <div className="p-4">
            <div className="max-w-7xl dark:bg-gray-800 rounded-xl bg-gray-100 mx-auto px-6 py-12 text-center space-y-4">
                {/* Main Title */}
                <h1 className="text-sm font-light text-gray-900 dark:text-gray-100 tracking-widest">
                    WELCOME TO <span className="text-blue-600 dark:text-blue-400">NEWS & UPDATES</span>
                </h1>

                {/* Subtitle / Description */}
                <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Stay updated with the latest happenings on lakes, trending stories, and important announcements from our project. Explore our news portal and never miss an update!
                </h2>

            </div>
            <div className="max-w-7xl mx-auto py-6 space-y-12">
                {/* --- Hero Section (Latest News) --- */}
                {news.length > 0 && (


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                        <div
                            className="rounded-xl overflow-hidden shadow-lg group bg-gray-50 dark:bg-gray-900"
                            key={news[0].id}
                        >
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
                                    <p className="text-[#09637e] dark:text-[#13afdf] ">Latest Update</p>
                                    <p>-</p>
                                    {news[0].date
                                        ? new Date(news[0].date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long", // full month name
                                            day: "numeric",
                                        })
                                        : ""}
                                </span>


                                <h1
                                    className="text-3xl md:text-4xl text-black/80 dark:text-white/80 font-bold mt-2 line-clamp-2 leading-12"
                                    dangerouslySetInnerHTML={{ __html: news[0].title?.rendered || "" }}
                                />

                                <div
                                    className="mt-3 text-sm md:text-base line-clamp-6   text-justify text-black dark:text-gray-300"
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
                                    className="  text-blue-500 dark:text-blue-400  hover:underline truncate"
                                >
                                    Read Full →
                                </Link>
                            </div>


                        </div>
                    </div>
                )}

                <div className="flex justify-between w-full items-center ">
                    <h1 className="text-3xl font-semibold">Latest News</h1>
                    <h1 className="flex items-center gap-2 font-semibold text-[#09637e] dark:text-[#0ac4fd]">See all <GoArrowRight /></h1>
                </div>
                
                {/* --- Other News Grid --- */}
                <div className="grid md:grid-cols-4 gap-6">
                    {news.slice(1).map((post: any) => {
                        const image =
                            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

                        return (
                            <div
                                key={post.id}
                                className="flex flex-col h-full group"
                            >
                                {/* Image */}
                                {image && (
                                    <img
                                        src={image}
                                        alt={post.title?.rendered || "news"}
                                        className="w-full h-48 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}

                                {/* Content */}
                                <div className="flex flex-col flex-1 pt-3 ">

                                    <div className="flex flex-col flex-1 text-xs text-gray-500 dark:text-gray-400">
                                        <p className="truncate">
                                            {post.date
                                                ? new Date(post.date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })
                                                : ""}

                                            {/* Separator if there are categories */}
                                            {post._embedded?.["wp:term"]?.[0]?.length > 0 && " - "}

                                            {/* Categories inline */}
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
                                            className="text-xl md:text-2xl font-bold line-clamp-1 text-gray-900 dark:text-gray-100"
                                            dangerouslySetInnerHTML={{ __html: post.title?.rendered || "Untitled" }}
                                        />
                                    </div>




                                    <div className="mt-2 flex flex-col flex-1">
                                        <div
                                            className="text-sm text-gray-700 dark:text-gray-300 line-clamp-4 text-justify [&_strong]:font-normal [&_b]:font-normal [&_em]:not-italic"
                                            dangerouslySetInnerHTML={{ __html: post.content?.rendered || "" }}
                                        />

                                        <Link
                                            href={`/news/${post.slug}`}
                                            className="mt-3 text-blue-600 dark:text-blue-400 font-medium hover:underline text-sm"
                                        >
                                            View Full →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}