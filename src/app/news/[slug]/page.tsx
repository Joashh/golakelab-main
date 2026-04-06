const BASE_URL = process.env.NEXT_PUBLIC_WP_URL;

async function getNews(slug: string) {
    const res = await fetch(
        `${BASE_URL}/wp-json/wp/v2/news?slug=${slug}&_embed`,
        { cache: "no-store" }
    );
    const data = await res.json();
    return data[0];
}

export default async function NewsPage({ params }: any) {
    // If params is a promise, unwrap it
    const { slug } = await params;

    console.log("Slug:", slug); // should print correctly

    const post = await getNews(slug);

    if (!post) return <p>News not found</p>;

    const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h1
                className="text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: post.title?.rendered || "" }}
            />
            <p className="text-gray-500">
                {post.date ? new Date(post.date).toLocaleDateString() : ""}
            </p>
            {image && <img src={image} className="w-full rounded-lg" />}
            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content?.rendered || "" }}
            />
        </div>
    );
}
