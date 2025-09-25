import type { Route } from "./+types/tags.$tag";
import { getPostsByTag } from "../lib/posts";

export function meta({ params }: Route.MetaArgs) {
  const tag = params.tag;
  return [
    { title: `${tag} の投稿 | ブログ` },
    { name: "description", content: `${tag} に関する投稿一覧` },
  ];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function TagList({ params }: Route.ComponentProps) {
  const tag = params.tag;
  const posts = getPostsByTag(tag);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">タグ: {tag}</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="rounded-xl border border-gray-200 dark:border-gray-800 p-5"
          >
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
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
