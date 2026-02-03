import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Habit Tracker",
    description:
      "Desktop app for tracking daily habits with streaks, weekly goals, statistics charts, CSV export, and desktop notifications.",
    tech: ["Python", "CustomTkinter", "SQLite", "Matplotlib"],
    link: "https://github.com/shrssrhs/habit-tracker",
  },
  {
    title: "Portfolio Website",
    description:
      "Personal portfolio site built with Next.js, TypeScript, and Tailwind CSS. The site you're looking at right now.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS"],
    link: "https://github.com/shrssrhs/portfolio",
  },
];

export default function Projects() {
  return (
    <div className="space-y-8 pt-8 md:pt-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted mt-2">Things I&apos;ve built and working on.</p>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-5 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-lg font-semibold group-hover:text-accent transition-colors">
                {project.title}
              </h2>
              <ExternalLink
                size={16}
                className="text-muted group-hover:text-accent transition-colors mt-1"
              />
            </div>
            <p className="text-sm text-muted mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-md bg-card-hover text-muted border border-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
