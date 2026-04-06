// components/RelatedNews.tsx
import Link from "next/link";

interface RelatedNewsProps {
    categoryId: number;
}

interface NewsPost {
    id: number;
    title: { rendered: string };
    slug: string;
    date: string;
    _embedded?: {
        "wp:featuredmedia"?: Array<{ source_url: string }>;
        "wp:term"?: Array<Array<{ id: number; name: string }>>;
    };
}

async function getNewsByCategory(categoryId: number): Promise<NewsPost[]> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/news?lake-category=${categoryId}&_embed&orderby=date&order=desc`,
        { cache: "no-store" }
    );
    const data = await res.json();
    return data;
}

export default async function RelatedNews({ categoryId }: RelatedNewsProps) {
    const news: NewsPost[] = await getNewsByCategory(categoryId);

    if (!news || news.length === 0) {
        return <p className="text-gray-500 dark:text-gray-400">No related news found.</p>;
    }

    return (
        <div>
            {/* Section Title */}
            <h3 className="my-6 text-2xl  text-gray-900 dark:text-white">
                Related News
            </h3>

            {/* Grid of News */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {news.map((post) => {
                    const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

                    return (
                        <div
                            key={post.id}
                            className="relative flex flex-col h-64 rounded-xl overflow-hidden group shadow-md hover:shadow-lg"
                        >
                            {/* Background Image */}
                            {image && (
                                <img
                                    src={image}
                                    alt={post.title.rendered}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

                            {/* Content */}
                            <div className="relative z-10 flex flex-col justify-end p-4 h-full text-white">
                                {/* Date */}
                                <p className="text-xs uppercase tracking-wide text-gray-200">
                                    {post.date
                                        ? new Date(post.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })
                                        : ""}
                                </p>

                                {/* Title */}
                                <h2
                                    className="text-lg md:text-xl font-bold line-clamp-2 mt-1"
                                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                />

                                {/* Link */}
                                <Link
                                    href={`/news/${post.slug}`}
                                    className="mt-2 inline-block text-blue-100 hover:text-blue-100 font-medium text-sm"
                                >
                                    View Full →
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}