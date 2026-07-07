import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`
        rounded-[22px]
        bg-[#f8f4ec]
        p-6

        shadow-[0_12px_25px_rgba(0,0,0,0.18)]

        border
        border-[#c8c2b7]

        font-helvetica-neue

        text-black

        ${className}
      `}
    >
      {children}
    </div>
  );
}
