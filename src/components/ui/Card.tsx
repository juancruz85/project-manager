import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`
        ios-card
        p-4
        text-[#1f252c]
        sm:p-5

        ${className}
      `}
    >
      {children}
    </div>
  );
}
