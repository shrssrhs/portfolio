import { Github, Send, Mail, MessageCircle, Heart, ExternalLink } from "lucide-react";
import FadeIn from "@/components/fade-in";

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
  {
    label: "Email",
    href: "mailto:shenshenus42@gmail.com",
    icon: Mail,
    handle: "shenshenus42@gmail.com",
  },
  {
    label: "Discord",
    href: "https://discord.gg/uAhuQUSP",
    icon: MessageCircle,
    handle: "discord.gg/uAhuQUSP",
  },
];

export default function Contact() {
  return (
    <div className="space-y-8 pt-8 md:pt-16">
      <FadeIn>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
          <p className="text-muted mt-2">
            Feel free to reach out — I&apos;m always open to connecting.
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-4">
        {contacts.map(({ label, href, icon: Icon, handle }, i) => (
          <FadeIn key={label} delay={0.1 + i * 0.1}>
            <a
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
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
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.5}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Heart size={16} className="text-accent" />
            <h2 className="text-xl font-bold tracking-tight">Support</h2>
          </div>
          <p className="text-muted mt-1 mb-4">If you enjoy my work, consider supporting me</p>
          <a
            href="https://send.monobank.ua/jar/PLACEHOLDER"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors"
          >
            <div className="p-3 rounded-lg bg-card-hover border border-border group-hover:border-accent/30 transition-colors">
              <Heart size={22} className="text-muted group-hover:text-accent transition-colors" />
            </div>
            <div>
              <h2 className="font-medium group-hover:text-accent transition-colors">Monobank Jar</h2>
              <p className="text-sm text-muted">Support via Monobank donation jar</p>
            </div>
            <ExternalLink size={14} className="text-muted ml-auto shrink-0" />
          </a>
        </div>
      </FadeIn>
    </div>
  );
}
