"use client";

import Link from "next/link";
import Image from "next/image";

import { usePlan } from "@/context/PlanContext";

export default function MyPlanPage() {
  const {
    todayPlan,
    savedWorkouts,
    removeFromTodayPlan,
    removeFromSaved,
  } = usePlan();

  return (
    <section className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <h1 className="text-3xl font-bold text-slate-900">
          My Plan
        </h1>

        {/* Today's Plan */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Today&apos;s Plan
          </h2>

          {todayPlan.length === 0 ? (
            <p className="mt-4 text-slate-500">
              No workouts added to today&apos;s plan yet.
            </p>
          ) : (
            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {todayPlan.map((workout) => (
                <div
                  key={workout.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <div className="relative h-48">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-slate-900">
                      {workout.name}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      {workout.description}
                    </p>

                    <div className="mt-4 flex gap-2">
                      <Link
                        href={`/workout/${workout.id}`}
                        className="flex-1 rounded-lg bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white"
                      >
                        View Details
                      </Link>

                      <button
                        onClick={() =>
                          removeFromTodayPlan(workout.id)
                        }
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Saved */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900">
            Saved
          </h2>

          {savedWorkouts.length === 0 ? (
            <p className="mt-4 text-slate-500">
              No saved workouts yet.
            </p>
          ) : (
            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {savedWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <div className="relative h-48">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-slate-900">
                      {workout.name}
                    </h3>

                    <div className="mt-4 flex gap-2">
                      <Link
                        href={`/workout/${workout.id}`}
                        className="flex-1 rounded-lg bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white"
                      >
                        View Details
                      </Link>

                      <button
                        onClick={() =>
                          removeFromSaved(workout.id)
                        }
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}