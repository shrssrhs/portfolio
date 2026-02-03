import { Github, Send, Mail } from "lucide-react";

const contacts = [
  {
    label: "GitHub",
    href: "https://github.com/shrssrhs",
    icon: Github,
    handle: "@shrssrhs",
  },
  {
    label: "Telegram",
    href: "https://t.me/shrssrhsduke",
    icon: Send,
    handle: "@shrssrhsduke",
  },
];

export default function Contact() {
  return (
    <div className="space-y-8 pt-8 md:pt-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
        <p className="text-muted mt-2">
          Feel free to reach out — I&apos;m always open to connecting.
        </p>
      </div>

      <div className="grid gap-4">
        {contacts.map(({ label, href, icon: Icon, handle }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors"
          >
            <div className="p-3 rounded-lg bg-card-hover border border-border group-hover:border-accent/30 transition-colors">
              <Icon size={22} className="text-muted group-hover:text-accent transition-colors" />
            </div>
            <div>
              <h2 className="font-medium group-hover:text-accent transition-colors">
                {label}
              </h2>
              <p className="text-sm text-muted">{handle}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
