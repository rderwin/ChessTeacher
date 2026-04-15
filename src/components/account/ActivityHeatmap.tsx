"use client";

interface ActivityHeatmapProps {
  /** Map of YYYY-MM-DD → puzzle count for that day. */
  dailyActivity: Record<string, number>;
  /** Number of weeks to show (default 12 = ~3 months). */
  weeks?: number;
}

/**
 * GitHub-style activity heatmap showing recent puzzle activity.
 * Columns are weeks, rows are days of the week.
 */
export default function ActivityHeatmap({
  dailyActivity,
  weeks = 12,
}: ActivityHeatmapProps) {
  // Build a grid of [weeks x 7 days], ending on today's week
  const today = new Date();
  const todayDow = today.getDay(); // 0 = Sunday

  // Build total cells = weeks * 7, going back from today
  const totalDays = weeks * 7;
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - (totalDays - 1));

  // Align start to a Sunday so columns are clean weeks
  const alignOffset = startDate.getDay();
  startDate.setDate(startDate.getDate() - alignOffset);

  const cells: Array<{
    date: Date;
    key: string;
    count: number;
  }> = [];
  const cellCount = (weeks + 1) * 7;
  for (let i = 0; i < cellCount; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    if (d > today) continue;
    const key = d.toISOString().slice(0, 10);
    cells.push({ date: d, key, count: dailyActivity[key] ?? 0 });
  }

  // Determine intensity levels (0-4)
  const max = Math.max(1, ...Object.values(dailyActivity));
  const getLevel = (count: number): number => {
    if (count === 0) return 0;
    const ratio = count / max;
    if (ratio >= 0.75) return 4;
    if (ratio >= 0.5) return 3;
    if (ratio >= 0.25) return 2;
    return 1;
  };

  const levelStyles = [
    "bg-stone-800 border-stone-700/50", // 0
    "bg-emerald-900/50 border-emerald-800/50", // 1
    "bg-emerald-700/70 border-emerald-600/50", // 2
    "bg-emerald-600/80 border-emerald-500/50", // 3
    "bg-emerald-500 border-emerald-400/60", // 4
  ];

  // Group cells into columns (weeks)
  const columns: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    columns.push(cells.slice(i, i + 7));
  }

  const totalActivity = cells.reduce((sum, c) => sum + c.count, 0);
  const activeDays = cells.filter((c) => c.count > 0).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-stone-400">
          Recent Activity
        </h3>
        <p className="text-[10px] text-stone-500">
          {totalActivity} solves · {activeDays} active days
        </p>
      </div>
      <div className="flex gap-[3px] overflow-x-auto pb-1">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }).map((_, row) => {
              const cell = col[row];
              if (!cell) {
                return (
                  <div
                    key={row}
                    className="w-3 h-3 bg-transparent"
                    aria-hidden
                  />
                );
              }
              const level = getLevel(cell.count);
              return (
                <div
                  key={row}
                  title={`${cell.key}: ${cell.count} ${cell.count === 1 ? "solve" : "solves"}`}
                  className={`w-3 h-3 rounded-sm border ${levelStyles[level]}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-[10px] text-stone-600">
        <span>Less</span>
        {levelStyles.map((cls, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm border ${cls}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
