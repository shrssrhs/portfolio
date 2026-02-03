"use client";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto p-6 md:px-12 md:py-16">
        {children}
      </main>
    </div>
  );
}
