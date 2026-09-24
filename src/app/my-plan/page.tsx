"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { usePlan } from "@/context/PlanContext";

export default function MyPlanPage() {
  const {
  todayPlan,
  savedWorkouts,
  loading,
  removeFromTodayPlan,
  removeFromSaved,
} = usePlan();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([]);

  

  // Current list
  const currentWorkouts =
    activeTab === "plan" ? todayPlan : savedWorkouts;

  // Metrics
  const totalMinutes = todayPlan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = todayPlan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  // Mark as Done
  const handleMarkAsDone = (id: number) => {
    setCompletedWorkouts((prev) =>
      prev.includes(id)
        ? prev.filter((workoutId) => workoutId !== id)
        : [...prev, id]
    );
  };

  return (
    <main className="min-h-screen bg-[#0b0c0f] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
            MY PLAN
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics Summary */}
        <div className="mb-5 grid grid-cols-1 overflow-hidden rounded-lg border border-[#25262b] bg-[#15161b] sm:grid-cols-3">

          {/* Exercises */}
          <div className="border-b border-[#25262b] p-4 sm:border-b-0 sm:border-r">
            <p className="text-[9px] text-gray-500">
              Exercises
            </p>

            <p className="mt-1 text-2xl font-black">
              {todayPlan.length}
            </p>
          </div>

          {/* Minutes */}
          <div className="border-b border-[#25262b] p-4 sm:border-b-0 sm:border-r">
            <p className="text-[9px] text-gray-500">
              Minutes
            </p>

            <p className="mt-1 text-2xl font-black">
              {totalMinutes}
            </p>
          </div>

          {/* Calories */}
          <div className="p-4">
            <p className="text-[9px] text-gray-500">
              Calories
            </p>

            <p className="mt-1 text-2xl font-black">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4 flex w-fit rounded-md border border-[#25262b] bg-[#15161b] p-1">

          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded px-4 py-1.5 text-[9px] font-bold transition ${
              activeTab === "plan"
                ? "bg-[#25262b] text-white"
                : "text-gray-500 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded px-4 py-1.5 text-[9px] font-bold transition ${
              activeTab === "saved"
                ? "bg-[#25262b] text-white"
                : "text-gray-500 hover:text-white"
            }`}
          >
            Saved
          </button>

        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[260px] items-center justify-center rounded-lg border border-[#25262b] bg-[#0d0e11]">
            <p className="text-xs text-gray-500">
              Loading workouts…
            </p>
          </div>
        ) : currentWorkouts.length === 0 ? (

          /* Empty State */
          <div className="flex min-h-[260px] flex-col items-center justify-center rounded-lg border border-dashed border-[#25262b] bg-[#0d0e11] px-4 text-center">

            <h2 className="text-sm font-black uppercase">
              NOTHING HERE YET
            </h2>

            <p className="mt-2 text-[9px] text-gray-500">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-4 rounded-full bg-[#ccff00] px-5 py-2 text-[9px] font-bold text-black transition hover:bg-[#b8e600]"
            >
              Go to workouts
            </Link>

          </div>
        ) : (

          /* Workout List */
          <div className="space-y-3">

            {currentWorkouts.map((workout) => {
              const isCompleted = completedWorkouts.includes(workout.id);

              return (
                <div
                  key={workout.id}
                  className={`overflow-hidden rounded-lg border bg-[#15161b] transition ${
                    isCompleted
                      ? "border-[#ccff00]/40 opacity-70"
                      : "border-[#25262b]"
                  }`}
                >

                  <div className="flex flex-col sm:flex-row">

                    {/* Thumbnail */}
                    <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-52">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-4">

                      <div>
                        <div className="flex items-start justify-between gap-3">

                          <div>
                            <h3 className="text-sm font-black uppercase">
                              {workout.name}
                            </h3>

                            <p className="mt-1 text-[10px] text-gray-500">
                              {workout.equipment}
                            </p>
                          </div>


                        </div>

                        {/* Stats */}
                        <div className="mt-4 flex flex-wrap items-center gap-4 text-[9px] text-gray-500">

                          <span>
                            ◷ {workout.duration} min
                          </span>

                          <span>
                            🔥 {workout.caloriesBurned} kcal
                          </span>

                          <span>
                            ★ {workout.rating}
                          </span>

                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-5 flex items-center justify-end gap-2">

                        <Link
                          href={`/workout/${workout.id}`}
                          className="rounded-md bg-[#25262b] px-4 py-2 text-[9px] font-bold text-white transition hover:bg-[#303138]"
                        >
                          View Details
                        </Link>
                       {activeTab === "plan" && (
                       <button
                       onClick={() => handleMarkAsDone(workout.id)}
                       className="rounded-md bg-[#ccff00] px-4 py-2 text-[9px] font-bold text-black transition hover:bg-[#b8e600]"
                       >
                      {isCompleted ? "Done ✓" : "Mark as Done"}
                       </button>
                       )}
                        {/* Remove */}
  <button
    onClick={() =>
      activeTab === "plan"
        ? removeFromTodayPlan(workout.id)
        : removeFromSaved(workout.id)
    }
    className="ml-1 flex items-center justify-center text-lg leading-none text-gray-500 transition hover:text-red-400"
    aria-label={`Remove ${workout.name}`}
  >
    ×
  </button>

                      </div>

                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}