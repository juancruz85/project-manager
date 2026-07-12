"use client";

import Link from "next/link";
import { useActionState } from "react";

import Card from "@/components/ui/Card";
import { loginAction } from "@/lib/actions/auth-actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <main className="ios-page flex min-h-screen flex-col">
      <header className="ios-topbar h-14">
        <div className="mx-auto flex h-full max-w-7xl items-center px-6">
          <h1 className="text-lg font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,.8)] sm:text-xl">
            A Project Manager
          </h1>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <Card className="w-full max-w-sm">
          <div className="mb-6 text-center">
            <h2 className="ios-panel-title text-3xl font-bold">Login</h2>
            <p className="mt-2 text-sm font-semibold text-[#6d7884]">
              Manage projects, tasks, and assignments.
            </p>
          </div>

          <form action={formAction} className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-bold text-[#44505d]">
                Email
              </span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                className="w-full rounded-[8px] border border-[#aeb8c4] bg-gradient-to-b from-[#eef2f6] to-white px-3 py-2 text-[#1f252c] shadow-[inset_0_1px_3px_rgba(25,32,40,.16),0_1px_0_rgba(255,255,255,.9)] outline-none transition-colors placeholder:text-[#8d98a5] focus:border-[#4f91ca]"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-bold text-[#44505d]">
                Password
              </span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
                className="w-full rounded-[8px] border border-[#aeb8c4] bg-gradient-to-b from-[#eef2f6] to-white px-3 py-2 text-[#1f252c] shadow-[inset_0_1px_3px_rgba(25,32,40,.16),0_1px_0_rgba(255,255,255,.9)] outline-none transition-colors placeholder:text-[#8d98a5] focus:border-[#4f91ca]"
                placeholder="Password"
              />
            </label>

            {state?.error && (
              <p className="text-center text-sm font-bold text-[#b9473e]">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="ios-button-blue flex h-10 w-full items-center justify-center rounded-[8px] text-sm font-bold text-white active:translate-y-px disabled:opacity-60"
            >
              {pending ? "Logging in..." : "Login"}
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-[#c5cdd6]" />
              <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#7b8794]">
                New here
              </span>
              <div className="h-px flex-1 bg-[#c5cdd6]" />
            </div>

            <Link
              href="/register"
              className="ios-button-gray flex h-10 w-full items-center justify-center rounded-[8px] text-sm font-bold active:translate-y-px"
            >
              Register
            </Link>
          </form>
        </Card>
      </div>
    </main>
  );
}
