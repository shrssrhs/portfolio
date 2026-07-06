import FadeIn from "@/components/fade-in";

const skills = [
  {
    category: "Core Stack",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend & Realtime",
    items: ["Supabase (auth, realtime, storage)", "LiveKit / WebRTC", "Electron"],
  },
  {
    category: "Tools",
    items: ["Git", "Vercel", "VS Code", "Python"],
  },
];

const timeline = [
  {
    period: "2025 — Present",
    title: "Independent Web Developer",
    description:
      "Building and shipping production web apps (Nox messenger: Next.js, Supabase, LiveKit).",
  },
  {
    period: "2024 — 2025",
    title: "Programming Courses",
    description:
      "Completed courses covering Python fundamentals, GUI development, audio processing, and data visualization.",
  },
];

export default function Resume() {
  return (
    <div className="space-y-10 pt-8 md:pt-16">
      <FadeIn>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume</h1>
          <p className="text-muted mt-2">My skills and experience so far.</p>
        </div>
      </FadeIn>

      {/* Skills */}
      <FadeIn delay={0.15}>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Skills</h2>
          <div className="grid gap-4">
            {skills.map((group) => (
              <div
                key={group.category}
                className="p-4 rounded-xl bg-card border border-border"
              >
                <h3 className="text-sm font-medium text-muted mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-1.5 rounded-lg bg-card-hover border border-border"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Timeline */}
      <FadeIn delay={0.3}>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Experience</h2>
          <div className="space-y-4">
            {timeline.map((item) => (
              <div
                key={item.period}
                className="p-4 rounded-xl bg-card border border-border"
              >
                <span className="text-xs text-accent font-medium">
                  {item.period}
                </span>
                <h3 className="font-medium mt-1">{item.title}</h3>
                <p className="text-sm text-muted mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
