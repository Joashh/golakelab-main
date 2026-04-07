'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type WPTerm = {
  id: number;
  name: string;
  taxonomy: string;
};

// Type for embedded objects inside a post
interface WPEmbedded {
  author?: { name: string }[];
  "wp:featuredmedia"?: { source_url: string }[];
  "wp:term"?: WPTerm[][];
}

// WordPress post type
type WPPost = {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: WPEmbedded; // use the unified embedded type
};

// WordPress comment type
type WPComment = {
  id: number;
  author_name: string;
  date: string;
  content: { rendered: string };
};

export default function Community() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [comments, setComments] = useState<Record<number, WPComment[]>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  const { data: session } = useSession();
  const [commentErrors, setCommentErrors] = useState<Record<number, string>>({});

  const [lakes, setLakes] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<number[]>([]);
  const [lake, setLake] = useState<number | null>(null);
  const [postingComment, setPostingComment] = useState<number | null>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_WP_URL;

  // ✅ Fetch posts + lakes + comments
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        const [postsRes, categoriesRes, commentsRes] = await Promise.all([
          fetch(`${BASE_URL}/wp-json/wp/v2/posts?_embed`),
          fetch(`${BASE_URL}/wp-json/wp/v2/lake-category`), //should be on the orig posts category not acf theyre not the same
          fetch(`${BASE_URL}/wp-json/wp/v2/comments?per_page=100&_fields=id,post,content,date,author_name`)
        ]);

        const postsData = await postsRes.json();
        const commentsData = await commentsRes.json();
        const categoriesData = await categoriesRes.json();

        setPosts(postsData);
        setCategories(categoriesData);

        // ✅ Group comments
        const grouped: Record<number, WPComment[]> = {};
        commentsData.forEach((c: any) => {
          if (!grouped[c.post]) grouped[c.post] = [];
          grouped[c.post].push(c);
        });

        setComments(grouped);

      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // ✅ Create Post
  const handleCreatePost = async () => {
    if (!session?.accessToken) return alert("Login required");

    if (!title.trim() || !content.trim()) {
      alert("Title and content are required");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/wp-json/wp/v2/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          title,
          content,
          status: "publish",
          tags,
          lake: lake ? [lake] : [],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        return;
      }

      // ✅ Optimistic UI
      setPosts(prev => [data, ...prev]);

      // reset form
      setTitle("");
      setContent("");
      setTags([]);
      setLake(null);

    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateComment = async (postId: number) => {
    if (!session?.accessToken) return alert("Login required");

    const content = commentInputs[postId];
    if (!content) return;

    setPostingComment(postId);

    // Clear previous error for this post
    setCommentErrors(prev => ({ ...prev, [postId]: "" }));

    try {
      const res = await fetch(`${BASE_URL}/wp-json/wp/v2/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ post: postId, content }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Use per-post error
        setCommentErrors(prev => ({
          ...prev,
          [postId]: data?.message || "Something went wrong",
        }));
        return;
      }

      // Success: update comments and clear input
      setComments(prev => ({
        ...prev,
        [postId]: [data, ...(prev[postId] || [])],
      }));
      setCommentInputs(prev => ({ ...prev, [postId]: "" }));

    } catch (err: any) {
      setCommentErrors(prev => ({
        ...prev,
        [postId]: err.message || "Something went wrong",
      }));
    } finally {
      setPostingComment(null);
    }
  };

  const handleCommentChange = (postId: number, value: string) => {
    setCommentInputs(prev => ({
      ...prev,
      [postId]: value
    }));
  };



  // ✅ Loading + Error UI
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6 animate-pulse">

        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm space-y-4"
          >

            {/* Title */}
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>

            {/* Meta */}
            <div className="h-3 w-1/3 bg-gray-100 dark:bg-gray-700 rounded"></div>

            {/* Content */}
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>

            {/* Comments */}
            <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="h-3 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-3/4"></div>
            </div>

          </div>
        ))}

      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 text-center bg-white dark:bg-gray-800  border border-red-200 rounded-xl shadow-sm">

        <div className="text-red-500 text-4xl mb-3">⚠️</div>

        <h2 className="text-lg font-semibold text-gray-800">
          Something went wrong
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {error}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
        >
          Try Again
        </button>

      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pb-10">
      <div className="pb-10 pt-5">
        <div className="dark:bg-orange-800 bg-orange-400 text-gray-900 dark:text-gray-200 px-6 py-3 rounded-xl shadow-lg border border-orange-400 dark:border-gray-700">
          <h1 className="font-semibold text-lg text-white dark:text-gray-200">🚧 Under Maintenance</h1>
          <p className="text-sm text-gray-100 dark:text-gray-200">
            This section is currently under maintenance.
          </p>
        </div>
      </div>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Community
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Share experiences and discuss about lakes
        </p>
      </div>

      {/* Create Post */}
      <div className="bg-white/80 dark:bg-gray-900/70 backdrop-blur border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-8 shadow-sm space-y-5">

        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Create Post
        </h2>

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title..."
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />

        {/* Content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share something with the community..."
          rows={4}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />

        {/* Controls */}
        <div className="grid grid-cols-2 gap-3">

          {/* Tags */}
          <input
            type="text"
            placeholder="Tags (1,2,3)"
            onChange={(e) => {
              const ids = e.target.value
                .split(",")
                .map((id) => Number(id.trim()))
                .filter((id) => !isNaN(id));
              setTags(ids);
            }}
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

        </div>

        {/* Publish */}
        <div className="flex justify-end">
          <button
            onClick={handleCreatePost}
            className="px-5 py-2.5 rounded-xl bg-[#09637e]  text-white text-sm font-medium  dark:hover:bg-[#0a5650] transition"
          >
            Publish
          </button>
        </div>

      </div>

      {/* Posts */}
      <div className="space-y-6">

        {posts.map((post) => {

          const author = post._embedded?.author?.[0]?.name || "Unknown";
          const postComments = comments[post.id] || [];
          const postCategories = post._embedded?.["wp:term"]
            ?.flat() // flatten nested arrays
            .filter(term => term.taxonomy === "category"); // only default categories

          return (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md dark:hover:shadow-lg transition"
            >

              {/* Post Header */}
              <div className="flex items-center gap-3 mb-4">

                <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-200">
                  {author.charAt(0)}
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {author}
                  </p>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-1">
                      {new Date(post.date).toLocaleString()} &nbsp;·&nbsp;
                      {post._embedded?.["wp:term"]
                        ?.flat()
                        .filter(term => term.taxonomy === "category")
                        .map(term => term.name)
                        .join(", ")}
                     
                    </p>
                  </div>
                </div>

              </div>

              {/* Title */}
              <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                {post.title.rendered}
              </h2>

              {/* Content */}
              <div
                className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-5"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />

              <div>
                {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                  <img
                    src={post._embedded["wp:featuredmedia"][0].source_url}
                    alt={post.title?.rendered || "news"}
                    className="w-full h-48 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              {/* Comments */}
              <div className="border-t pt-4 space-y-4 border-gray-200 dark:border-gray-700">

                {postComments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">

                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-200">
                      {comment.author_name.charAt(0)}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                        {comment.author_name}
                      </p>

                      <div
                        className="text-sm text-gray-600 dark:text-gray-300"
                        dangerouslySetInnerHTML={{
                          __html: comment.content.rendered,
                        }}
                      />

                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {new Date(comment.date).toLocaleString()}
                      </p>
                    </div>

                  </div>
                ))}

                {/* Comment Input */}
                <div className="flex gap-2 pt-2">

                  <input
                    type="text"
                    value={commentInputs[post.id] || ""}
                    onChange={(e) =>
                      handleCommentChange(post.id, e.target.value)
                    }
                    placeholder="Write a comment..."
                    className="flex-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />

                  <button
                    disabled={postingComment === post.id}
                    onClick={() => handleCreateComment(post.id)}
                    className="px-4 py-2 rounded-xl bg-gray-900 dark:bg-gray-700 text-white text-sm hover:bg-black dark:hover:bg-gray-600 disabled:opacity-50"
                  >
                    {postingComment === post.id ? "Posting..." : "Send"}
                  </button>

                </div>

                {commentErrors[post.id] && (
                  <p
                    className="text-red-500 mt-2 text-sm"
                    dangerouslySetInnerHTML={{ __html: commentErrors[post.id] }}
                  />
                )}

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}