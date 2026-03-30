'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


type WPPost = {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: {
    author?: { name: string }[];
  };
};

type WPComment = {
  id: number;
  author_name: string;
  date: string;
  content: { rendered: string };
};

export default function Community() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [comments, setComments] = useState<Record<number, WPComment[]>>({});
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  const { data: session } = useSession();
  const [lakes, setLakes] = useState<any[]>([]);
  const [selectedLake, setSelectedLake] = useState<string>("");
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/lake`)
      .then(res => res.json())
      .then(data => setLakes(data))
      .catch(err => console.error(err));
  }, []);

  // Fetch posts
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/posts?_embed`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/lake`)
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  // Fetch comments for each post
  useEffect(() => {
    if (posts.length === 0) return;

    posts.forEach(post => {
      fetch(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/comments?post=${post.id}`)
        .then(res => res.json())
        .then(data => {
          setComments(prev => ({
            ...prev,
            [post.id]: data
          }));
        })
        .catch(err => console.error(err));
    });
  }, [posts]);

  const handleCreatePost = async () => {
    console.log("Clicked");

    if (!session?.accessToken) {
      alert("No access token. Please login.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/posts`, {
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
        console.error("Error:", data);
        return;
      }

      console.log("Success:", data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentChange = (postId: number, value: string) => {
    setCommentInputs(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<number[]>([]);
  const [lake, setLake] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Community</h1>

      {/* Create Post */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm space-y-5">

        {/* Title */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        {/* Content */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share something..."
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        {/* Tags */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            Tags (comma separated IDs)
          </label>
          <input
            type="text"
            onChange={(e) => {
              const ids = e.target.value
                .split(",")
                .map((id) => Number(id.trim()))
                .filter((id) => !isNaN(id));
              setTags(ids);
            }}
            placeholder="e.g. 1,2,3"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        {/* Lake Select */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">Lake</label>
          <select
            value={lake ?? ""}
            onChange={(e) => setLake(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="">Select a lake</option>
            {lakes.map((lake) => (
              <option key={lake.id} value={lake.id}>
                {lake.name}
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleCreatePost}
            className="bg-teal-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Publish Post
          </button>
        </div>

      </div>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map(post => {
          const author = post._embedded?.author?.[0]?.name || "Unknown";
          const postComments = comments[post.id] || [];

          return (
            <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">

              {/* Post Header */}
              <div className="mb-3">
                <h2 className="font-semibold text-lg">{post.title.rendered}</h2>
                <p className="text-xs text-gray-500">
                  Posted by {author} • {new Date(post.date).toLocaleString()}
                </p>
              </div>

              {/* Post Content */}
              <div
                className="text-sm text-gray-700 mb-4"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />

              {/* Comments */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <h3 className="text-sm font-semibold text-gray-600">
                  Comments
                </h3>

                {postComments.map(comment => (
                  <div key={comment.id} className="text-sm">
                    <p className="font-medium text-gray-800">
                      {comment.author_name}
                    </p>
                    <p
                      className="text-gray-600"
                      dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
                    />
                    <p className="text-xs text-gray-400">
                      {new Date(comment.date).toLocaleString()}
                    </p>
                  </div>
                ))}

                {/* Comment Input */}
                <div className="mt-3">
                  <input
                    type="text"
                    value={commentInputs[post.id] || ""}
                    onChange={(e) =>
                      handleCommentChange(post.id, e.target.value)
                    }
                    placeholder="Write a comment..."
                    className="w-full border border-gray-200 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                  <button className="mt-2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm hover:bg-black">
                    Comment
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}