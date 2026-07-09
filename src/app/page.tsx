import Navbar from "@/components/ui/Navbar";
import DashboardStats from "@/components/ui/DashboardStat";
import UpcomingTasks from "@/components/dashboard/UpcomingTasks";
import CalendarWidget from "@/components/dashboard/CalendarWidget";

export default function Home() {
  return (
    <main className="ios-page min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-[8px] border border-[#b8c0ca] bg-gradient-to-b from-white to-[#e3e8ee] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_2px_5px_rgba(25,32,40,.1)] sm:px-5">
          <h1 className="ios-panel-title text-3xl font-bold sm:text-4xl">
            Dashboard
          </h1>
        </div>

        <DashboardStats />

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <UpcomingTasks />
          <CalendarWidget />
        </div>
      </div>
    </main>
  );
}
