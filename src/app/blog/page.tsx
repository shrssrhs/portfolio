"use client";

import { useState, useEffect } from "react";
import FadeIn from "@/components/fade-in";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

const defaultPosts: BlogPost[] = [
  {
    slug: "getting-started-with-python",
    title: "How I Got Started with Python",
    date: "2025-01-15",
    summary:
      "My journey from zero coding knowledge to building desktop apps with Python and CustomTkinter.",
  },
  {
    slug: "building-habit-tracker",
    title: "Building a Habit Tracker from Scratch",
    date: "2025-02-01",
    summary:
      "A deep dive into creating a full-featured habit tracking app with SQLite, Matplotlib, and desktop notifications.",
  },
];

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>(defaultPosts);

  useEffect(() => {
    const stored = localStorage.getItem("blog_posts");
    if (stored) {
      const customPosts: BlogPost[] = JSON.parse(stored);
      // Merge: custom posts first, then defaults (skip duplicates by slug)
      const customSlugs = new Set(customPosts.map((p) => p.slug));
      const merged = [
        ...customPosts,
        ...defaultPosts.filter((p) => !customSlugs.has(p.slug)),
      ];
      merged.sort((a, b) => b.date.localeCompare(a.date));
      setPosts(merged);
    }
  }, []);

  return (
    <div className="space-y-8 pt-8 md:pt-16">
      <FadeIn>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted mt-2">
            Thoughts on coding, learning, and building things.
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-4">
        {posts.map((post, i) => (
          <FadeIn key={post.slug} delay={0.1 + i * 0.1}>
            <article className="group p-5 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors">
              <time className="text-xs text-muted">{post.date}</time>
              <h2 className="text-lg font-semibold mt-1 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-muted mt-2">{post.summary}</p>
            </article>
          </FadeIn>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-muted text-center py-12">
          No posts yet. Stay tuned!
        </p>
      )}
    </div>
  );
}
