"use client";

import { useEffect, useState, useCallback } from "react";

interface DayData {
  date: string;
  count: number;
  level: number; // 0-4
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2024 + 1 }, (_, i) => 2024 + i);
// e.g. [2024, 2025] or [2024, 2025, 2026] depending on current year

export default function GitHubCalendar() {
  const [data, setData] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);
  const [selectedYear, setSelectedYear] = useState<string>("last");

  const fetchContributions = useCallback(async (year: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/shrssrhs?y=${year}`
      );
      if (res.ok) {
        const json = await res.json();
        const contributions: DayData[] = json.contributions || [];
        setData(contributions);
        const totalKey = year === "last" ? "lastYear" : year;
        setTotalContributions(
          json.total?.[totalKey] ??
          contributions.reduce((s, d) => s + d.count, 0)
        );
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchContributions(selectedYear);
  }, [selectedYear, fetchContributions]);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  // Build grid
  const dateMap = new Map<string, DayData>();
  data.forEach((d) => dateMap.set(d.date, d));

  let startDate: Date;
  let endDate: Date;

  if (selectedYear === "last") {
    endDate = new Date();
    startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 364);
  } else {
    const y = parseInt(selectedYear);
    startDate = new Date(y, 0, 1);
    endDate = new Date(y, 11, 31);
    if (endDate > new Date()) endDate = new Date();
  }
  // Align start to Sunday
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const weeks: (DayData | null)[][] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const week: (DayData | null)[] = [];
    for (let day = 0; day < 7; day++) {
      if (current > endDate) {
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

  const targetYear = selectedYear === "last" ? null : parseInt(selectedYear);
  const months: { label: string; col: number }[] = [];
  let lastMonth = -1;
  let lastCol = -4;
  weeks.forEach((week, i) => {
    const firstDay = week.find((d) => d !== null);
    if (firstDay) {
      const d = new Date(firstDay.date);
      const m = d.getMonth();
      // Skip months outside the selected year
      if (targetYear && d.getFullYear() !== targetYear) return;
      // Only add if month changed and enough space (3+ cols) from last label
      if (m !== lastMonth && i - lastCol >= 3) {
        lastMonth = m;
        lastCol = i;
        months.push({
          label: d.toLocaleString("en", { month: "short" }),
          col: i,
        });
      }
    }
  });

  const yearLabel = selectedYear === "last" ? "the last year" : selectedYear;

  return (
    <div className="p-4 rounded-xl bg-card border border-border">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium">
          {loading ? "..." : totalContributions} contributions in {yearLabel}
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

      {/* Year selector */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => handleYearChange("last")}
          className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
            selectedYear === "last"
              ? "bg-white/10 border-white/20 text-white font-medium"
              : "bg-white/5 border-white/10 text-muted hover:text-white hover:bg-white/10"
          }`}
        >
          Last year
        </button>
        {years.map((y) => (
          <button
            key={y}
            onClick={() => handleYearChange(String(y))}
            className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
              selectedYear === String(y)
                ? "bg-white/10 border-white/20 text-white font-medium"
                : "bg-white/5 border-white/10 text-muted hover:text-white hover:bg-white/10"
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-8 text-center text-muted text-sm">Loading...</div>
      ) : data.length === 0 ? (
        <div className="py-8 text-center text-muted text-sm">No data available</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="inline-block">
            {/* Month labels */}
            <div className="flex mb-1" style={{ paddingLeft: 28 }}>
              {weeks.map((_, wi) => {
                const month = months.find((m) => m.col === wi);
                return (
                  <span
                    key={wi}
                    className="text-[10px] text-muted"
                    style={{ width: 12, flexShrink: 0, whiteSpace: "nowrap" }}
                  >
                    {month ? month.label : ""}
                  </span>
                );
              })}
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
      )}
    </div>
  );
}
