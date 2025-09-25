import type { Route } from "./+types/posts.$id";
import { getPostById } from "../lib/posts";
import { useEffect, useMemo, useRef, useState } from "react";

export function meta({ params }: Route.MetaArgs) {
  const id = Number(params.id);
  const post = getPostById(id);
  return [
    { title: post ? `${post.title} | ブログ` : "記事 | ブログ" },
    { name: "description", content: post?.excerpt ?? "記事詳細" },
  ];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function estimateReadingMinutes(text: string) {
  const chars = text.length;
  const charsPerMinute = 800; // 日本語の目安
  return Math.max(1, Math.round(chars / charsPerMinute));
}

export default function PostDetail({ params }: Route.ComponentProps) {
  const id = Number(params.id);
  const post = getPostById(id);
  const [views, setViews] = useState<number>(() => {
    const key = `views:${id}`;
    const raw = localStorage.getItem(key);
    return raw ? Number(raw) : 0;
  });
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 仮の閲覧回数（ローカル）
    const key = `views:${id}`;
    const v = (Number(localStorage.getItem(key)) || 0) + 1;
    localStorage.setItem(key, String(v));
    setViews(v);
  }, [id]);

  useEffect(() => {
    function onScroll() {
      const el = document.body;
      const scrollTop = window.scrollY;
      const docHeight = el.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0;
      if (progressRef.current)
        progressRef.current.style.width = `${ratio * 100}%`;
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!post) {
    return (
      <main className="py-16">
        <p>記事が見つかりませんでした。</p>
      </main>
    );
  }

  const readingMinutes = useMemo(
    () => (post ? estimateReadingMinutes(post.content) : 0),
    [post],
  );

  function share() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: post?.title, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      alert("URLをコピーしました");
    }
  }

  function copyUrl() {
    navigator.clipboard.writeText(window.location.href);
    alert("URLをコピーしました");
  }

  return (
    <article className="prose dark:prose-invert max-w-none">
      <div className="fixed left-0 top-0 h-1 bg-blue-600" ref={progressRef} />
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500">
        <time dateTime={post.date}>{formatDate(post.date)}</time> —{" "}
        {post.tags.map((t) => (
          <a
            key={t}
            href={`/tags/${encodeURIComponent(t)}`}
            className="underline decoration-dotted mr-2"
          >
            {t}
          </a>
        ))}
        <span className="ml-2">/ 約 {readingMinutes} 分で読めます</span>
        <span className="ml-2">/ 閲覧 {views}</span>
      </p>
      <div className="flex gap-2 my-3">
        <button
          onClick={share}
          className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-900"
        >
          共有
        </button>
        <button
          onClick={copyUrl}
          className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-900"
        >
          URLコピー
        </button>
      </div>
      <hr />
      <p>{post.content}</p>
    </article>
  );
}
