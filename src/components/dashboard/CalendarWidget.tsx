import Card from "@/components/ui/Card";

export interface CalendarEvent {
  id: number;
  title: string;
  day: number;
  color: "blue" | "red" | "green";
}

interface CalendarWidgetProps {
  monthLabel?: string;
  today?: number;
  days?: number[];
  events?: CalendarEvent[];
}

const defaultEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Essay",
    day: 9,
    color: "red",
  },
  {
    id: 2,
    title: "Robotics",
    day: 12,
    color: "blue",
  },
  {
    id: 3,
    title: "Study",
    day: 18,
    color: "green",
  },
];

const defaultCalendarDays = [
  29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2,
];

function DayCell({
  day,
  today,
  events,
}: {
  day: number;
  today: number;
  events: CalendarEvent[];
}) {
  const dayEvents = events.filter((event) => event.day === day);
  const isToday = day === today;

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
  monthLabel = "July 2026",
  today = 9,
  days = defaultCalendarDays,
  events = defaultEvents,
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
        <button
          aria-label="Previous month"
          className="ios-button-gray h-8 w-8 rounded-[8px] text-sm font-bold active:translate-y-px"
        >
          &lt;
        </button>

        <h2
          className="
          ios-panel-title
          text-xl
          font-bold
          "
        >
          {monthLabel}
        </h2>

        <button
          aria-label="Next month"
          className="ios-button-gray h-8 w-8 rounded-[8px] text-sm font-bold active:translate-y-px"
        >
          &gt;
        </button>
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
