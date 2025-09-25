import type { Route } from "./+types/home";
import { useMemo, useState } from "react";
import { getAllPosts, getAllTags, type Post } from "../lib/posts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ブログ | Home" },
    { name: "description", content: "最新の投稿一覧" },
  ];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Home() {
  const [q, setQ] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allPosts = useMemo(() => getAllPosts(), []);
  const tags = useMemo(() => getAllTags(), []);

  const filtered = useMemo(() => {
    const byTag = activeTag
      ? allPosts.filter((p) => p.tags.includes(activeTag))
      : allPosts;
    const byQuery = q.trim()
      ? byTag.filter(
          (p) =>
            p.title.toLowerCase().includes(q.toLowerCase()) ||
            p.excerpt.toLowerCase().includes(q.toLowerCase()),
        )
      : byTag;
    return byQuery;
  }, [allPosts, q, activeTag]);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">最新の投稿</h1>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="検索..."
          className="w-56 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTag(null)}
          className={`rounded-full px-3 py-1 text-sm border ${
            activeTag === null
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          }`}
        >
          すべて
        </button>
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTag(t)}
            className={`rounded-full px-3 py-1 text-sm border ${
              activeTag === t
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((post) => (
          <article
            key={post.id}
            className="rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition"
          >
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>•</span>
              <div className="flex gap-2">
                {post.tags.map((t) => (
                  <a
                    key={t}
                    href={`/tags/${encodeURIComponent(t)}`}
                    className="rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-gray-700 dark:text-gray-300 hover:underline"
                  >
                    {t}
                  </a>
                ))}
              </div>
            </div>
            <a href={`/posts/${post.id}`} className="mt-2 block">
              <h2 className="text-xl font-semibold hover:underline">
                {post.title}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {post.excerpt}
              </p>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
