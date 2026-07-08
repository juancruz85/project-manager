import { ReactNode } from "react";

interface Props {
  title: string;
  value: string;
  subtitle: string;
}

export default function DashboardStat({ title, value, subtitle }: Props) {
  return (
    <div
      className="
        rounded-[20px]
        bg-[#f7f3eb]
        p-6
  
        shadow-lg
  
        border
        border-[#d2cdc3]

        text-black
        "
    >
      <h3 className="mt-3 text-lg font-helvetica-neue">{title}</h3>

      <p className="text-4xl font-bold font-helvetica-neue">{value}</p>

      <p className="text-zinc-500 font-helvetica-neue">{subtitle}</p>
    </div>
  );
}
