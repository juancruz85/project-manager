interface DashboardStatData {
  title: string;
  value: string;
  subtitle: string;
}

interface DashboardStatsProps {
  stats?: DashboardStatData[];
}

const defaultDashboardStats: DashboardStatData[] = [
  { title: "Tasks", value: "12", subtitle: "2 Due Today" },
  { title: "Projects", value: "4", subtitle: "Active" },
  { title: "Assignments", value: "7", subtitle: "School" },
  { title: "Completed", value: "85%", subtitle: "This Week" },
];

export function DashboardStat({ title, value, subtitle }: DashboardStatData) {
  return (
    <div className="ios-card relative overflow-hidden p-4 text-[#1f252c] sm:p-5">
      <div className="absolute inset-x-3 top-2 h-px bg-white/80" />

      <h3 className="ios-panel-title text-sm font-bold uppercase tracking-[0.08em]">
        {title}
      </h3>

      <p className="mt-2 text-4xl font-bold leading-none text-[#26313d] drop-shadow-[0_1px_0_rgba(255,255,255,.9)]">
        {value}
      </p>

      <p className="mt-2 text-sm font-semibold text-[#6d7884]">{subtitle}</p>
    </div>
  );
}

export function DashboardStats({
  stats = defaultDashboardStats,
}: DashboardStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <DashboardStat
          key={stat.title}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
        />
      ))}
    </div>
  );
}
