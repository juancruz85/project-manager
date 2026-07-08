import Image from "next/image";

import Navbar from "@/components/ui/Navbar";
import DashboardStat from "@/components/ui/DashboardStat";
import Card from "@/components/ui/Card";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#ece8df]">
      <Navbar />

      <div className="mx-auto max-w-7xl p-8">
        <h1 className="mb-8 text-4xl font-semibold text-zinc-700">Dashboard</h1>

        <div className="grid gap-6 lg:grid-cols-4">
          <DashboardStat title="Tasks" value="12" subtitle="2 Due Today" />

          <DashboardStat title="Projects" value="4" subtitle="Active" />

          <DashboardStat title="Assignments" value="7" subtitle="School" />

          <DashboardStat title="Completed" value="85%" subtitle="This Week" />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <h2 className="mb-5 text-2xl">Upcoming Tasks</h2>

            {/* Tasks go here */}
          </Card>

          <Card>
            <h2 className="mb-5 text-2xl">Calendar</h2>
          </Card>
        </div>
      </div>
    </main>
  );
}
