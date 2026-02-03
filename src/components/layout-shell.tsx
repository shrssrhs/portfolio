"use client";

import { useState } from "react";
import Sidebar from "./sidebar";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main
        className={`flex-1 p-6 md:p-12 max-w-3xl mx-auto transition-all duration-300 ${
          collapsed ? "md:ml-0" : "md:ml-56"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
