import { ArrowRight } from "lucide-react";
import Link from "next/link";
import FadeIn from "@/components/fade-in";
import GitHubCalendar from "@/components/github-calendar";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <FadeIn>
        <section className="space-y-4 pt-8 md:pt-16">
          <h1 className="text-4xl font-bold tracking-tight">
            Hey, I&apos;m shrssrhs
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-xl">
            I&apos;m a student learning to code and building desktop applications
            with Python. Currently exploring new technologies and working on
            projects for my portfolio.
          </p>
        </section>
      </FadeIn>

      {/* What I do */}
      <FadeIn delay={0.15}>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">What I do</h2>
          <div className="grid gap-4">
            <div className="p-4 rounded-xl bg-card border border-border">
              <h3 className="font-medium mb-1">Desktop Applications</h3>
              <p className="text-sm text-muted">
                Building GUI apps with Python and CustomTkinter — from habit
                trackers to utility tools.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <h3 className="font-medium mb-1">Learning Web Dev</h3>
              <p className="text-sm text-muted">
                Diving into TypeScript, React, and Next.js to expand my skill set
                beyond Python.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Featured projects */}
      <FadeIn delay={0.3}>
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Featured Projects</h2>
            <Link
              href="/projects"
              className="text-sm text-accent hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4">
            <Link
              href="/projects"
              className="group p-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium group-hover:text-accent transition-colors">
                    Habit Tracker
                  </h3>
                  <p className="text-sm text-muted mt-1">
                    Desktop app for tracking daily habits with streak counting,
                    statistics, and data visualization.
                  </p>
                </div>
                <span className="text-xs text-muted bg-card-hover px-2 py-1 rounded-md">
                  Python
                </span>
              </div>
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* GitHub Activity */}
      <FadeIn delay={0.45}>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">GitHub Activity</h2>
          <GitHubCalendar />
        </section>
      </FadeIn>

      {/* Connect */}
      <FadeIn delay={0.6}>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Connect</h2>
          <div className="flex gap-4">
            <a
              href="https://github.com/shrssrhs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-foreground transition-colors underline underline-offset-4"
            >
              GitHub
            </a>
            <a
              href="https://t.me/shrssrhsduke"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-foreground transition-colors underline underline-offset-4"
            >
              Telegram
            </a>
            <Link
              href="/contact"
              className="text-sm text-muted hover:text-foreground transition-colors underline underline-offset-4"
            >
              Contact page
            </Link>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
