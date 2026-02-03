"use client";

import { useState } from "react";
import Sidebar from "./sidebar";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div
        className={`transition-all duration-300 ${
          collapsed ? "md:ml-0" : "md:ml-56"
        }`}
      >
        <main className="max-w-3xl mx-auto p-6 md:p-12">
          {children}
        </main>
      </div>
    </div>
  );
}
