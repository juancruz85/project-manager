"use client";

import { useState } from "react";
import { logout } from "@/lib/actions/auth";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="ios-topbar h-14">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <h1 className="text-lg font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,.8)] sm:text-xl">
          A Project Manager
        </h1>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            aria-label="Open create menu"
            className="ios-button-blue flex h-9 w-9 items-center justify-center rounded-[8px] text-2xl font-bold text-white active:translate-y-[2px]"
          >
            +
          </button>

          {open && (
            <div className="absolute right-0 top-12 z-10 w-48 overflow-hidden rounded-[8px] border border-[#252c34] bg-[#4c5560] shadow-[inset_0_1px_0_rgba(255,255,255,.18),0_8px_20px_rgba(0,0,0,.32)]">
              <button className="w-full px-4 py-3 text-left text-sm font-semibold text-white drop-shadow-[0_1px_0_rgba(0,0,0,.65)] transition-colors hover:bg-white/18 border-b border-white/10">
                New Task
              </button>

              <button className="w-full px-4 py-3 text-left text-sm font-semibold text-white drop-shadow-[0_1px_0_rgba(0,0,0,.65)] transition-colors hover:bg-white/18 border-b border-white/10">
                New Project
              </button>

              <button className="w-full px-4 py-3 text-left text-sm font-semibold text-white drop-shadow-[0_1px_0_rgba(0,0,0,.65)] transition-colors hover:bg-white/18">
                New Assignment
              </button>
            </div>
          )}
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="ios-button-blue flex h-9 w-9 items-center justify-center rounded-[8px] text-2xl font-bold text-white active:translate-y-[2px]"
          >
            Log out
          </button>
        </form>
      </div>
    </nav>
  );
}
