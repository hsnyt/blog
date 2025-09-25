export type Post = {
  id: number;
  title: string;
  date: string; // ISO string
  tags: string[];
  excerpt: string;
  content: string;
};

const posts: Post[] = [
  {
    id: 1,
    title: "はじめての投稿",
    date: "2025-09-20",
    tags: ["日記"],
    excerpt: "ブログへようこそ。ここでは学びや日々の記録を書いていきます。",
    content:
      "これはブログのはじめての投稿です。今後は開発メモや学習ログ、雑記などを更新していきます。",
  },
  {
    id: 2,
    title: "ASP.NET Core 9 でミニマルAPI",
    date: "2025-09-22",
    tags: ["C#", "Backend"],
    excerpt:
      "ASP.NET Core 9 のミニマルAPIで素早くエンドポイントを作る方法をまとめました。",
    content:
      "Program.cs の最小構成から CRUD の雛形を作成し、今後は EF Core で DB と接続します。",
  },
  {
    id: 3,
    title: "React Router v7 の基本",
    date: "2025-09-24",
    tags: ["React", "Frontend"],
    excerpt: "ルーティングの考え方と、レイアウトの作り方をおさらいします。",
    content:
      "Nested Routes や Layout、型生成の使い方までを簡単にまとめました。",
  },
];

export function getAllPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostById(id: number): Post | undefined {
  return posts.find((p) => p.id === id);
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}
