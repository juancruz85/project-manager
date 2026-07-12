import Link from "next/link";

import Card from "@/components/ui/Card";

export interface CalendarEvent {
  id: string;
  title: string;
  day: number;
  color: "blue" | "red" | "green";
}

interface CalendarWidgetProps {
  monthLabel: string;
  today: number | null;
  days: number[];
  events: CalendarEvent[];
  prevMonthParam: string;
  nextMonthParam: string;
}

function DayCell({
  day,
  today,
  events,
}: {
  day: number;
  today: number | null;
  events: CalendarEvent[];
}) {
  const dayEvents = events.filter((event) => event.day === day);
  const isToday = today !== null && day === today;

  return (
    <div
      className="
      ios-calendar-cell
      relative
      min-h-16
      border
      p-1
      sm:min-h-20
      "
    >
      <div
        className={`
        flex
        h-6
        w-6
        items-center
        justify-center

        rounded-full

        text-xs
        font-semibold

        ${
          isToday
            ? "ios-button-blue text-white"
            : "text-[#5f6b78] drop-shadow-[0_1px_0_rgba(255,255,255,.9)]"
        }
        `}
      >
        {day}
      </div>

      <div className="mt-1 space-y-1">
        {dayEvents.map((event) => (
          <div
            key={event.id}
            className={`
            truncate

            rounded-[4px]

            px-1

            text-[10px]
            font-semibold
            text-white
            shadow-[inset_0_1px_0_rgba(255,255,255,.24)]

            ${event.color === "red" && "bg-gradient-to-b from-[#d86058] to-[#b4423b]"}

            ${event.color === "blue" && "bg-gradient-to-b from-[#5999d1] to-[#2d70ad]"}

            ${event.color === "green" && "bg-gradient-to-b from-[#7fb47b] to-[#518a52]"}

            `}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CalendarWidget({
  monthLabel,
  today,
  days,
  events,
  prevMonthParam,
  nextMonthParam,
}: CalendarWidgetProps) {
  return (
    <Card>
      <div
        className="
        mb-5
        flex
        justify-between
        items-center
      "
      >
        <Link
          href={`/dashboard?month=${prevMonthParam}`}
          aria-label="Previous month"
          className="ios-button-gray flex h-8 w-8 items-center justify-center rounded-[8px] text-sm font-bold active:translate-y-px"
        >
          &lt;
        </Link>

        <h2
          className="
          ios-panel-title
          text-xl
          font-bold
          "
        >
          {monthLabel}
        </h2>

        <Link
          href={`/dashboard?month=${nextMonthParam}`}
          aria-label="Next month"
          className="ios-button-gray flex h-8 w-8 items-center justify-center rounded-[8px] text-sm font-bold active:translate-y-px"
        >
          &gt;
        </Link>
      </div>

      <div
        className="
        overflow-hidden

        rounded-[8px]

        border
        border-[#b8c0ca]

        shadow-[inset_0_1px_4px_rgba(25,32,40,.1),0_1px_0_rgba(255,255,255,.86)]

        "
      >
        {/* Week headers */}

        <div
          className="
          grid
          grid-cols-7

          bg-gradient-to-b
          from-[#f8fafc]
          to-[#dfe5ec]

          text-center

          text-xs
          font-bold
          text-[#5f6b78]
          drop-shadow-[0_1px_0_rgba(255,255,255,.9)]

          py-2
          "
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Month grid */}

        <div
          className="
          grid
          grid-cols-7
          "
        >
          {days.map((day, index) => (
            <DayCell key={index} day={day} today={today} events={events} />
          ))}
        </div>
      </div>
    </Card>
  );
}
