"use client";

import { ArrowRight, ExternalLink, Github, Send } from "lucide-react";
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

const projects = [
  {
    title: "Habit Tracker",
    description: "Desktop app for tracking daily habits with streaks, stats, and notifications.",
    link: "https://github.com/shrssrhs/habit-tracker",
  },
  {
    title: "Portfolio Website",
    description: "This site. Built with Next.js, TypeScript, and Tailwind CSS.",
    link: "https://github.com/shrssrhs/portfolio",
  },
];

const defaultPosts = [
  {
    title: "Building a Habit Tracker from Scratch",
    date: "February 1, 2025",
    summary: "A deep dive into creating a full-featured habit tracking app with SQLite, Matplotlib, and desktop notifications.",
  },
  {
    title: "How I Got Started with Python",
    date: "January 15, 2025",
    summary: "My journey from zero coding knowledge to building desktop apps with Python and CustomTkinter.",
  },
];

const skills = [
  { category: "Languages", items: ["Python", "TypeScript", "HTML/CSS"] },
  { category: "Frameworks", items: ["CustomTkinter", "Next.js", "React", "Tailwind CSS"] },
  { category: "Tools", items: ["Git", "SQLite", "Matplotlib", "VS Code"] },
];

const timeline = [
  { period: "2025 — Present", title: "Self-taught Developer", description: "Building desktop applications with Python and learning web development." },
  { period: "2024 — 2025", title: "Programming Courses", description: "Python fundamentals, GUI development, audio processing, and data visualization." },
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
    <div className="flex flex-col md:flex-row gap-12 md:gap-16">
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
            <p className="text-sm text-muted">Student & Developer</p>
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
              <h2 className="text-sm font-semibold mb-2">About</h2>
              <p className="text-muted leading-relaxed">
                I&apos;m a student learning to code and building desktop
                applications with Python. Currently exploring web development
                with TypeScript and React.
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
            <p className="text-sm text-muted mb-4">Things I&apos;m actively working on</p>
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
            <p className="text-sm text-muted mb-4">Writing about my experiences and learnings</p>
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
          <section id="contact" className="scroll-mt-20">
            <h2 className="text-sm font-semibold mb-4">Connect</h2>
            <div className="space-y-3">
              <a
                href="https://github.com/shrssrhs"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3"
              >
                <Github size={18} className="text-muted group-hover:text-accent transition-colors" />
                <div>
                  <p className="text-sm font-medium group-hover:text-accent transition-colors">GitHub</p>
                  <p className="text-xs text-muted">@shrssrhs</p>
                </div>
              </a>
              <a
                href="https://t.me/shrssrhsduke"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3"
              >
                <Send size={18} className="text-muted group-hover:text-accent transition-colors" />
                <div>
                  <p className="text-sm font-medium group-hover:text-accent transition-colors">Telegram</p>
                  <p className="text-xs text-muted">@shrssrhsduke</p>
                </div>
              </a>
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
