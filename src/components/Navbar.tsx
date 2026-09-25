"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();

  const { todayPlan, savedWorkouts } = usePlan();

  const isHomePage = pathname === "/";
  const isMyPlanPage = pathname === "/my-plan";

  return (
    <nav className="border-b border-[#202126] bg-[#0b0c0f]">
      <div className="mx-auto flex h-12 max-w-[1400px] items-center justify-between px-5">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/assets/logo.png"
            alt="FitLog"
            width={70}
            height={24}
            className="h-auto w-auto"
          />

          <span className="text-sm font-bold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-3">

          {/* Workouts */}
          <Link
            href="/"
            className={`rounded-md px-4 py-2 text-[10px] transition ${
              isHomePage
                ? "bg-[#2a2b2f] font-semibold text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>

          {/* My Plan */}
          <Link
            href="/my-plan"
            className={`rounded-md px-4 py-2 text-[10px] transition ${
              isMyPlanPage
                ? "bg-[#2a2b2f] font-semibold text-[#ccff00]"
                : "text-[#ccff00] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Right Side Badges */}
        <div className="flex items-center gap-4 text-[10px]">

          {/* Plan */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-gray-400 transition hover:text-white"
          >
            <span>Plan</span>

            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ccff00] px-1 text-[9px] font-bold text-black">
              {todayPlan.length}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-gray-400 transition hover:text-white"
          >
            <span>Saved</span>

            <span className="flex h-4 min-w-4 items-center justify-center rounded-full border border-[#55565b] px-1 text-[9px] text-gray-300">
              {savedWorkouts.length}
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
}