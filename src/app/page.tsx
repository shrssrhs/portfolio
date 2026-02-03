import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/fade-in";
import GitHubCalendar from "@/components/github-calendar";

const navLinks = [
  { href: "/", label: "Home", key: "1" },
  { href: "/blog", label: "Blog", key: "2" },
  { href: "/projects", label: "Projects", key: "3" },
  { href: "/resume", label: "Resume", key: "4" },
  { href: "/contact", label: "Contact", key: "5" },
];

const projects = [
  {
    title: "Habit Tracker",
    description: "Desktop app for tracking daily habits with streaks, stats, and notifications.",
    tech: "Python",
    link: "https://github.com/shrssrhs/habit-tracker",
  },
  {
    title: "Portfolio Website",
    description: "This site. Built with Next.js, TypeScript, and Tailwind CSS.",
    tech: "TypeScript",
    link: "https://github.com/shrssrhs/portfolio",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row gap-12 md:gap-16">
      {/* Left column — Profile & Nav */}
      <FadeIn direction="right">
        <div className="md:sticky md:top-16 md:self-start md:w-48 shrink-0 space-y-8">
          {/* Avatar & name */}
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

          {/* Navigation */}
          <nav className="space-y-1">
            {navLinks.map(({ href, label, key }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between py-1.5 text-sm text-muted hover:text-foreground transition-colors"
              >
                {label}
                <span className="text-[11px] px-1.5 py-0.5 rounded border border-border text-muted">
                  {key}
                </span>
              </Link>
            ))}
          </nav>

          {/* Social links */}
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
      <div className="flex-1 space-y-16">
        {/* About */}
        <FadeIn>
          <section>
            <h2 className="text-sm font-semibold mb-2">About</h2>
            <p className="text-muted leading-relaxed">
              I&apos;m a student learning to code and building desktop
              applications with Python. Currently exploring web development
              with TypeScript and React.
            </p>
          </section>
        </FadeIn>

        {/* Projects */}
        <FadeIn delay={0.1}>
          <section>
            <h2 className="text-sm font-semibold mb-1">Projects</h2>
            <p className="text-sm text-muted mb-4">
              Things I&apos;m actively working on
            </p>
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
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors mt-4"
            >
              View all <ArrowRight size={14} />
            </Link>
          </section>
        </FadeIn>

        {/* GitHub Activity */}
        <FadeIn delay={0.2}>
          <section>
            <h2 className="text-sm font-semibold mb-4">GitHub Activity</h2>
            <GitHubCalendar />
          </section>
        </FadeIn>

        {/* Recent Blog Posts */}
        <FadeIn delay={0.3}>
          <section>
            <h2 className="text-sm font-semibold mb-1">Recent Posts</h2>
            <p className="text-sm text-muted mb-4">
              Writing about my experiences and learnings
            </p>
            <div className="space-y-3">
              <Link
                href="/blog"
                className="flex items-center justify-between py-2 group"
              >
                <span className="text-sm font-medium group-hover:text-accent transition-colors">
                  Building a Habit Tracker from Scratch
                </span>
                <span className="text-xs text-muted shrink-0 ml-4">
                  February 1, 2025
                </span>
              </Link>
              <Link
                href="/blog"
                className="flex items-center justify-between py-2 group"
              >
                <span className="text-sm font-medium group-hover:text-accent transition-colors">
                  How I Got Started with Python
                </span>
                <span className="text-xs text-muted shrink-0 ml-4">
                  January 15, 2025
                </span>
              </Link>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors mt-4"
            >
              View all <ArrowRight size={14} />
            </Link>
          </section>
        </FadeIn>

        {/* Connect */}
        <FadeIn delay={0.4}>
          <section>
            <h2 className="text-sm font-semibold mb-2">Connect</h2>
            <div className="flex gap-6">
              <a
                href="https://github.com/shrssrhs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://t.me/shrssrhsduke"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Telegram
              </a>
              <a
                href="mailto:"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Email
              </a>
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
