"use client";

import { ArrowRight, ExternalLink, Github, Send, Mail, MessageCircle, Heart } from "lucide-react";
import Image from "next/image";
import FadeIn from "@/components/fade-in";
import GitHubCalendar from "@/components/github-calendar";
import { useState, useEffect } from "react";

const navLinks = [
  { id: "home", label: "Home", key: "1" },
  { id: "projects", label: "Projects", key: "2" },
  { id: "blog", label: "Blog", key: "3" },
  { id: "resume", label: "Resume", key: "4" },
  { id: "contact", label: "Contact", key: "5" },
];

const featuredProject = {
  title: "Nox — real-time messenger (live)",
  description:
    "A full-stack chat platform: channels, DMs, reactions, typing indicators, unread tracking, file uploads and voice/video calls. Built solo and deployed to production.",
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind",
    "Supabase (auth, realtime, storage)",
    "LiveKit (WebRTC)",
    "Electron",
  ],
  link: "https://onirnox.lol",
};

const projects = [
  {
    title: "Habit Tracker",
    description: "Small desktop app for tracking daily habits — an earlier side project.",
    link: "https://github.com/shrssrhs/habit-tracker",
  },
];

const defaultPosts = [
  {
    title: "Shipping Nox — a Real-time Messenger",
    date: "June 2026",
    summary: "Building and deploying a full-stack chat platform with channels, DMs, voice/video calls and realtime sync on Next.js, Supabase and LiveKit. Live at onirnox.lol",
  },
  {
    title: "Building a Habit Tracker from Scratch",
    date: "February 1, 2025",
    summary: "A deep dive into creating a full-featured habit tracking app with SQLite, Matplotlib, and desktop notifications.",
  },
];

const skills = [
  { category: "Core Stack", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { category: "Backend & Realtime", items: ["Supabase (auth, realtime, storage)", "LiveKit / WebRTC", "Electron"] },
  { category: "Tools", items: ["Git", "Vercel", "VS Code", "Python"] },
];

const timeline = [
  { period: "2025 — Present", title: "Independent Web Developer", description: "Building and shipping production web apps (Nox messenger: Next.js, Supabase, LiveKit)." },
  { period: "2024 — 2025", title: "Programming Courses", description: "Python fundamentals, GUI development, audio processing, and data visualization." },
];

const contacts = [
  { label: "GitHub", href: "https://github.com/shrssrhs", icon: Github, handle: "@shrssrhs", description: "Check out my projects and contributions" },
  { label: "Telegram", href: "https://t.me/shrssrhsduke", icon: Send, handle: "@shrssrhsduke", description: "Quick messages and updates" },
  { label: "Email", href: "mailto:shenshenus42@gmail.com", icon: Mail, handle: "shenshenus42@gmail.com", description: "For longer conversations and collaborations" },
  { label: "Discord", href: "https://discord.gg/uAhuQUSP", icon: MessageCircle, handle: "discord.gg/uAhuQUSP", description: "Join my Discord server" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const link = navLinks.find((l) => l.key === e.key);
      if (link) {
        e.preventDefault();
        document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-12 md:gap-16 md:justify-center">
      {/* Left column — Profile & Nav */}
      <FadeIn direction="right">
        <div className="md:sticky md:top-16 md:self-start md:w-48 shrink-0 space-y-8">
          <div>
            <Image
              src="/avatar.jpeg"
              alt="shrssrhs"
              width={80}
              height={80}
              className="mb-4"
            />
            <h1 className="text-lg font-bold tracking-tight">shrssrhs</h1>
            <p className="text-sm text-muted">Web Developer</p>
          </div>

          <nav className="space-y-1">
            {navLinks.map(({ id, label, key }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`flex items-center justify-between py-1.5 text-sm transition-colors ${
                  activeSection === id
                    ? "text-foreground font-medium"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {label}
                <span className="text-[11px] px-1.5 py-0.5 rounded border border-border text-muted">
                  {key}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex gap-3 pt-2 border-t border-border">
            <a
              href="https://github.com/shrssrhs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://t.me/shrssrhsduke"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              Telegram
            </a>
          </div>
        </div>
      </FadeIn>

      {/* Right column — Content */}
      <div className="flex-1 space-y-20">
        {/* Home / About */}
        <FadeIn>
          <section id="home" className="scroll-mt-20 space-y-8">
            <div>
              <h2 className="text-xl font-bold tracking-tight mb-2">
                Web Developer — Next.js · React · Supabase
              </h2>
              <p className="text-muted leading-relaxed">
                I build and ship full-stack web apps with real-time features:
                chat, voice/video calls, live data.
              </p>
            </div>

            <div>
              <h2 className="text-sm font-semibold mb-2">About</h2>
              <p className="text-muted leading-relaxed">
                I&apos;m a web developer from Ukraine working with Next.js,
                React, TypeScript, Tailwind and Supabase. I take projects from
                idea to deployed production — my latest is Nox, a real-time
                messenger with voice/video calls, built and shipped end-to-end.
                I care about clean, minimal UI and apps that actually work, not
                just demos.
              </p>
            </div>

            <div>
              <h2 className="text-sm font-semibold mb-1">Ventures</h2>
              <p className="text-sm text-muted mb-4">What I&apos;m up to outside of code</p>
              <div className="space-y-4">
                <a
                  href="https://www.youtube.com/@shrssrhs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="flex items-start gap-1">
                    <h3 className="font-medium text-sm group-hover:text-accent transition-colors">
                      YouTube | shrssrhs
                    </h3>
                    <ExternalLink size={12} className="text-muted mt-0.5 shrink-0" />
                  </div>
                  <p className="text-sm text-muted mt-0.5">
                    Videos about coding, projects, and tech.
                  </p>
                </a>
                <a
                  href="https://t.me/SherstyanoiGad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="flex items-start gap-1">
                    <h3 className="font-medium text-sm group-hover:text-accent transition-colors">
                      Telegram | SherstyanoiGad
                    </h3>
                    <ExternalLink size={12} className="text-muted mt-0.5 shrink-0" />
                  </div>
                  <p className="text-sm text-muted mt-0.5">
                    Channel with updates, thoughts, and behind the scenes.
                  </p>
                </a>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Projects */}
        <FadeIn delay={0.1}>
          <section id="projects" className="scroll-mt-20">
            <h2 className="text-sm font-semibold mb-1">Projects</h2>
            <p className="text-sm text-muted mb-4">Things I&apos;ve built and shipped</p>

            {/* Featured project */}
            <div className="mb-6 p-4 rounded-lg bg-card border border-border">
              <a
                href={featuredProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="flex items-start gap-1">
                  <h3 className="font-medium text-sm group-hover:text-accent transition-colors">
                    {featuredProject.title}
                  </h3>
                  <ExternalLink size={12} className="text-muted mt-0.5 shrink-0" />
                </div>
                <p className="text-sm text-muted mt-1">{featuredProject.description}</p>
              </a>
              <div className="flex flex-wrap gap-2 mt-3">
                {featuredProject.stack.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-md bg-card-hover text-muted border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {/* TODO: demo video — drop a screen capture into /public and embed it here:
              <video
                src="/nox-demo.mp4"
                controls
                muted
                playsInline
                className="mt-4 w-full rounded-lg border border-border"
              />
              */}
            </div>

            <div className="space-y-4">
              {projects.map((p) => (
                <a
                  key={p.title}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="flex items-start gap-1">
                    <h3 className="font-medium text-sm group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <ExternalLink size={12} className="text-muted mt-0.5 shrink-0" />
                  </div>
                  <p className="text-sm text-muted mt-0.5">{p.description}</p>
                </a>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold mb-4">GitHub Activity</h3>
              <GitHubCalendar />
            </div>
          </section>
        </FadeIn>

        {/* Blog */}
        <FadeIn delay={0.2}>
          <section id="blog" className="scroll-mt-20">
            <h2 className="text-sm font-semibold mb-1">Recent Posts</h2>
            <p className="text-sm text-muted mb-4">Writing about building and shipping web apps</p>
            <div className="space-y-3">
              {defaultPosts.map((post) => (
                <div key={post.title} className="py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{post.title}</span>
                    <span className="text-xs text-muted shrink-0 ml-4">{post.date}</span>
                  </div>
                  <p className="text-sm text-muted mt-1">{post.summary}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Resume */}
        <FadeIn delay={0.3}>
          <section id="resume" className="scroll-mt-20">
            <h2 className="text-sm font-semibold mb-4">Skills</h2>
            <div className="space-y-4 mb-10">
              {skills.map((group) => (
                <div key={group.category}>
                  <h3 className="text-xs text-muted mb-2">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-sm px-3 py-1.5 rounded-lg bg-card border border-border"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-sm font-semibold mb-4">Experience</h2>
            <div className="space-y-4">
              {timeline.map((item) => (
                <div key={item.period}>
                  <span className="text-xs text-accent font-medium">{item.period}</span>
                  <h3 className="font-medium text-sm mt-1">{item.title}</h3>
                  <p className="text-sm text-muted mt-0.5">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Contact */}
        <FadeIn delay={0.4}>
          <section id="contact" className="scroll-mt-20 min-h-[60vh]">
            <h2 className="text-sm font-semibold mb-1">Connect</h2>
            <p className="text-sm text-muted mb-4">Feel free to reach out — I&apos;m always open to connecting</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contacts.map(({ label, href, icon: Icon, handle, description }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="group flex items-start gap-3 p-4 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors"
                >
                  <Icon size={18} className="text-muted group-hover:text-accent transition-colors mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium group-hover:text-accent transition-colors">{label}</p>
                    <p className="text-xs text-muted">{handle}</p>
                    <p className="text-xs text-muted mt-1">{description}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Support */}
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-1">
                <Heart size={14} className="text-accent" />
                <h2 className="text-sm font-semibold">Support</h2>
              </div>
              <p className="text-sm text-muted mb-4">If you enjoy my work, consider supporting me</p>
              <a
                href="https://send.monobank.ua/jar/PLACEHOLDER"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-card-hover border border-border group-hover:border-accent/30 transition-colors">
                  <Heart size={18} className="text-muted group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-medium group-hover:text-accent transition-colors">Monobank Jar</p>
                  <p className="text-xs text-muted">Support via Monobank donation jar</p>
                </div>
                <ExternalLink size={12} className="text-muted ml-auto shrink-0" />
              </a>
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
