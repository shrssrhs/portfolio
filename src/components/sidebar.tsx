"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, FolderOpen, PenLine, Mail, FileText, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/blog", label: "Blog", icon: PenLine },
  { href: "/contact", label: "Contact", icon: Mail },
  { href: "/resume", label: "Resume", icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-card border border-border"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-56 bg-card border-r border-border z-40 flex flex-col p-6 transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="mb-10">
          <Link href="/" className="block" onClick={() => setOpen(false)}>
            <Image
              src="/avatar.jpeg"
              alt="Shen"
              width={64}
              height={64}
              className="mb-3"
            />
            <h1 className="text-xl font-bold tracking-tight">shrssrhs</h1>
            <p className="text-sm text-muted mt-1">Student & Developer</p>
          </Link>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-muted hover:text-foreground hover:bg-card-hover"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex gap-3 pt-6 border-t border-border">
          <a
            href="https://github.com/shrssrhs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href="https://t.me/shrssrhsduke"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors text-sm"
          >
            Telegram
          </a>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
