import type { Route } from "./+types/categories";
import { getAllPosts } from "../lib/posts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "カテゴリ一覧 | ブログ" },
    { name: "description", content: "タグをカテゴリとして一覧表示" },
  ];
}

export default function Categories() {
  const posts = getAllPosts();
  const counts = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  const items = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">カテゴリ一覧</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {items.map(([tag, count]) => (
          <li key={tag}>
            <a
              href={`/tags/${encodeURIComponent(tag)}`}
              className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 hover:bg-gray-50/60 dark:hover:bg-gray-900/60 transition"
            >
              <span className="font-medium">{tag}</span>
              <span className="text-xs rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5">
                {count}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
