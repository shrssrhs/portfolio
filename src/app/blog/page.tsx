import Link from "next/link";

const posts = [
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
  return (
    <div className="space-y-8 pt-8 md:pt-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted mt-2">
          Thoughts on coding, learning, and building things.
        </p>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group p-5 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors"
          >
            <time className="text-xs text-muted">{post.date}</time>
            <h2 className="text-lg font-semibold mt-1 group-hover:text-accent transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-muted mt-2">{post.summary}</p>
          </article>
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
