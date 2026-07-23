const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export interface DayInfo {
  day: number;
  isCurrentMonth: boolean;
}

export interface MonthInfo {
  year: number;
  month: number; // 0-indexed
  label: string;
  today: number | null;
  days: DayInfo[];
  firstDayOfMonth: Date;
  lastDayOfMonth: Date;
  prevMonthParam: string;
  nextMonthParam: string;
}

/** Parses a "YYYY-MM" search param into a validated {year, month}, defaulting to the current date. */
export function parseMonthParam(param: string | undefined, now: Date): { year: number; month: number } {
  if (param) {
    const match = /^(\d{4})-(\d{2})$/.exec(param);
    if (match) {
      const year = Number(match[1]);
      const month = Number(match[2]) - 1;
      if (month >= 0 && month <= 11) {
        return { year, month };
      }
    }
  }
  return { year: now.getFullYear(), month: now.getMonth() };
}

export function getMonthInfo(year: number, month: number, now: Date): MonthInfo {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days: DayInfo[] = [];
  for (let i = startWeekday - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ day: d, isCurrentMonth: true });
  }
  let nextMonthDay = 1;
  while (days.length % 7 !== 0) {
    days.push({ day: nextMonthDay++, isCurrentMonth: false });
  }

  const isCurrentMonth = now.getFullYear() === year && now.getMonth() === month;

  const prevDate = new Date(year, month - 1, 1);
  const nextDate = new Date(year, month + 1, 1);

  return {
    year,
    month,
    label: `${MONTH_NAMES[month]} ${year}`,
    today: isCurrentMonth ? now.getDate() : null,
    days,
    firstDayOfMonth,
    lastDayOfMonth,
    prevMonthParam: formatMonthParam(prevDate.getFullYear(), prevDate.getMonth()),
    nextMonthParam: formatMonthParam(nextDate.getFullYear(), nextDate.getMonth()),
  };
}

export function formatMonthParam(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

/** Formats a due date relative to "now" the way the dashboard's task list expects (Today, Tomorrow, weekday, or short date). */
export function formatDueDate(dueDate: Date, now: Date): string {
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const today = startOfDay(now);
  const due = startOfDay(dueDate);
  const diffDays = Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";
  if (diffDays > 1 && diffDays < 7) return WEEKDAY_NAMES[due.getDay()];

  return due.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/** Returns the [start, end) bounds of the Sunday-Saturday week containing `now`. */
export function getCurrentWeekRange(now: Date): { start: Date; end: Date } {
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
  const end = new Date(start);
  end.setDate(start.getDate() + 7);
  return { start, end };
}
