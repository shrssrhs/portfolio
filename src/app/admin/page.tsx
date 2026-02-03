"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, LogOut, Plus, Trash2, Edit3, Github, GitCommit, Star, GitFork } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: { message: string }[];
    action?: string;
    ref?: string;
    ref_type?: string;
  };
}

const POSTS_KEY = "blog_posts";

function getPosts(): BlogPost[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(POSTS_KEY);
  return data ? JSON.parse(data) : [];
}

function savePosts(posts: BlogPost[]) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

// --- Login Screen ---
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      sessionStorage.setItem("admin_auth", "true");
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-card border border-border">
            <Lock size={24} className="text-accent" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">Admin Panel</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
          />
          {error && (
            <p className="text-sm text-red-400">Wrong password</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/80 transition-colors disabled:opacity-50"
          >
            {loading ? "Checking..." : "Enter"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// --- Blog Editor ---
function BlogEditor() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  const handleSave = () => {
    if (!title.trim() || !summary.trim()) return;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const post: BlogPost = {
      slug: editing?.slug || slug,
      title: title.trim(),
      date: editing?.date || new Date().toISOString().split("T")[0],
      summary: summary.trim(),
    };

    let updated: BlogPost[];
    if (editing) {
      updated = posts.map((p) => (p.slug === editing.slug ? post : p));
    } else {
      updated = [post, ...posts];
    }
    savePosts(updated);
    setPosts(updated);
    resetForm();
  };

  const handleDelete = (slug: string) => {
    const updated = posts.filter((p) => p.slug !== slug);
    savePosts(updated);
    setPosts(updated);
  };

  const handleEdit = (post: BlogPost) => {
    setEditing(post);
    setTitle(post.title);
    setSummary(post.summary);
    setShowForm(true);
  };

  const resetForm = () => {
    setTitle("");
    setSummary("");
    setEditing(null);
    setShowForm(false);
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Blog Posts</h2>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-accent text-white hover:bg-accent/80 transition-colors"
        >
          <Plus size={16} />
          New Post
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="p-4 rounded-xl bg-card border border-border space-y-3"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className="w-full px-3 py-2 rounded-lg bg-card-hover border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
          />
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Post summary"
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-card-hover border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-accent resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-accent text-white text-sm hover:bg-accent/80 transition-colors"
            >
              {editing ? "Update" : "Publish"}
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 rounded-lg bg-card-hover text-muted text-sm hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      <div className="space-y-2">
        {posts.length === 0 && (
          <p className="text-sm text-muted py-4">No posts yet. Create your first one!</p>
        )}
        {posts.map((post) => (
          <div
            key={post.slug}
            className="flex items-center justify-between p-4 rounded-xl bg-card border border-border"
          >
            <div className="flex-1 mr-4">
              <h3 className="font-medium text-sm">{post.title}</h3>
              <p className="text-xs text-muted mt-1">{post.date}</p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => handleEdit(post)}
                className="p-2 rounded-md hover:bg-card-hover transition-colors"
              >
                <Edit3 size={14} className="text-muted" />
              </button>
              <button
                onClick={() => handleDelete(post.slug)}
                className="p-2 rounded-md hover:bg-card-hover transition-colors"
              >
                <Trash2 size={14} className="text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- GitHub Activity ---
function GitHubActivity() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const [reposRes, eventsRes] = await Promise.all([
          fetch("https://api.github.com/users/shrssrhs/repos?sort=updated&per_page=5"),
          fetch("https://api.github.com/users/shrssrhs/events?per_page=10"),
        ]);
        if (reposRes.ok) setRepos(await reposRes.json());
        if (eventsRes.ok) setEvents(await eventsRes.json());
      } catch {
        // ignore fetch errors
      }
      setLoading(false);
    }
    fetchGitHub();
  }, []);

  const formatEvent = (event: GitHubEvent): string => {
    const repo = event.repo.name.split("/")[1];
    switch (event.type) {
      case "PushEvent": {
        const msg = event.payload.commits?.[0]?.message || "code changes";
        return `Pushed to ${repo}: "${msg}"`;
      }
      case "CreateEvent":
        return `Created ${event.payload.ref_type} ${event.payload.ref || ""} in ${repo}`;
      case "WatchEvent":
        return `Starred ${repo}`;
      case "ForkEvent":
        return `Forked ${repo}`;
      case "IssuesEvent":
        return `${event.payload.action} issue in ${repo}`;
      case "PullRequestEvent":
        return `${event.payload.action} PR in ${repo}`;
      default:
        return `${event.type.replace("Event", "")} in ${repo}`;
    }
  };

  const timeAgo = (dateStr: string): string => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (loading) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">GitHub Activity</h2>
        <div className="p-8 text-center text-muted text-sm">Loading...</div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Github size={20} />
        <h2 className="text-xl font-semibold">GitHub Activity</h2>
      </div>

      {/* Repos */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted">Recent Repositories</h3>
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-medium">{repo.name}</h4>
                {repo.description && (
                  <p className="text-xs text-muted mt-1">{repo.description}</p>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted">
                {repo.language && (
                  <span>{repo.language}</span>
                )}
                <span className="flex items-center gap-1">
                  <Star size={12} /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={12} /> {repo.forks_count}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Events */}
      {events.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted">Recent Events</h3>
          <div className="space-y-1">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border"
              >
                <GitCommit size={14} className="text-muted mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{formatEvent(event)}</p>
                  <p className="text-xs text-muted">{timeAgo(event.created_at)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// --- Main Admin Page ---
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "true") {
      setAuthed(true);
    }
  }, []);

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  return (
    <div className="space-y-10 pt-8 md:pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted mt-1">Welcome back, shrssrhs</p>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem("admin_auth");
              setAuthed(false);
            }}
            className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <BlogEditor />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GitHubActivity />
      </motion.div>
    </div>
  );
}
