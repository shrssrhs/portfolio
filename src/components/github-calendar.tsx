"use client";

import { useEffect, useState } from "react";

interface DayData {
  date: string;
  count: number;
  level: number; // 0-4
}

export default function GitHubCalendar() {
  const [data, setData] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch(
          "https://github-contributions-api.jogruber.de/v4/shrssrhs?y=last"
        );
        if (res.ok) {
          const json = await res.json();
          const contributions: { date: string; count: number; level: number }[] =
            json.contributions || [];
          setData(contributions);
          setTotalContributions(json.total?.lastYear || contributions.reduce((s: number, d: { count: number }) => s + d.count, 0));
        }
      } catch {
        // ignore
      }
      setLoading(false);
    }
    fetchContributions();
  }, []);

  if (loading) {
    return (
      <div className="p-4 rounded-xl bg-card border border-border">
        <p className="text-sm text-muted text-center py-6">Loading GitHub activity...</p>
      </div>
    );
  }

  if (data.length === 0) return null;

  // Build weeks grid (columns = weeks, rows = days of week)
  // Take last 52 weeks
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 364); // ~52 weeks
  // Align to Sunday
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const dateMap = new Map<string, DayData>();
  data.forEach((d) => dateMap.set(d.date, d));

  const weeks: (DayData | null)[][] = [];
  const current = new Date(startDate);

  while (current <= today) {
    const week: (DayData | null)[] = [];
    for (let day = 0; day < 7; day++) {
      if (current > today) {
        week.push(null);
      } else {
        const dateStr = current.toISOString().split("T")[0];
        const entry = dateMap.get(dateStr);
        week.push(entry || { date: dateStr, count: 0, level: 0 });
      }
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }

  const levelColors = [
    "bg-[#161b22]",
    "bg-[#0e4429]",
    "bg-[#006d32]",
    "bg-[#26a641]",
    "bg-[#39d353]",
  ];

  const months: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const firstDay = week.find((d) => d !== null);
    if (firstDay) {
      const m = new Date(firstDay.date).getMonth();
      if (m !== lastMonth) {
        lastMonth = m;
        months.push({
          label: new Date(firstDay.date).toLocaleString("en", { month: "short" }),
          col: i,
        });
      }
    }
  });

  return (
    <div className="p-4 rounded-xl bg-card border border-border">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium">
          {totalContributions} contributions in the last year
        </p>
        <a
          href="https://github.com/shrssrhs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted hover:text-foreground transition-colors"
        >
          @shrssrhs
        </a>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block">
          {/* Month labels */}
          <div className="flex mb-1" style={{ paddingLeft: 28 }}>
            {months.map((m, i) => (
              <span
                key={i}
                className="text-[10px] text-muted"
                style={{
                  position: "relative",
                  left: m.col * 13,
                  marginRight: i < months.length - 1 ? 0 : 0,
                  width: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className="flex gap-[1px]">
            {/* Day labels */}
            <div className="flex flex-col gap-[1px] mr-1 justify-between py-[2px]">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                <span key={i} className="text-[10px] text-muted h-[11px] leading-[11px] w-6 text-right pr-1">
                  {d}
                </span>
              ))}
            </div>

            {/* Grid */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[1px]">
                {week.map((day, di) => (
                  <div
                    key={di}
                    className={`w-[11px] h-[11px] rounded-[2px] ${
                      day ? levelColors[day.level] : "bg-transparent"
                    }`}
                    title={
                      day
                        ? `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}`
                        : ""
                    }
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1 mt-2">
            <span className="text-[10px] text-muted mr-1">Less</span>
            {levelColors.map((color, i) => (
              <div key={i} className={`w-[11px] h-[11px] rounded-[2px] ${color}`} />
            ))}
            <span className="text-[10px] text-muted ml-1">More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
