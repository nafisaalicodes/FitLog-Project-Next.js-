"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

import { usePlan } from "@/context/PlanContext";

type SortOption = "duration" | "calories" | "rating";

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
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  
  const currentWorkouts =
    activeTab === "plan" ? todayPlan : savedWorkouts;

  
  const sortedWorkouts = [...currentWorkouts].sort((a, b) => {
    if (sortBy === "duration") {
      return b.duration - a.duration;
    }

    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });


  const totalMinutes = todayPlan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = todayPlan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

 const handleMarkAsDone = (id: number, name: string) => {
  const isAlreadyCompleted = completedWorkouts.includes(id);

  if (isAlreadyCompleted) {
    setCompletedWorkouts((prev) =>
      prev.filter((workoutId) => workoutId !== id)
    );

    toast.info(`${name} marked as not done.`);
  } else {
    setCompletedWorkouts((prev) => [...prev, id]);

    toast.success(`${name} marked as done.`);
  }
};

  
 const handleRemove = (
  id: number,
  tab: "plan" | "saved"
) => {
  if (tab === "plan") {
    removeFromTodayPlan(id);
  } else {
    removeFromSaved(id);
  }

  setCompletedWorkouts((prev) =>
    prev.filter((workoutId) => workoutId !== id)
  );
};

  return (
    <main className="min-h-screen bg-[#0b0c0f] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">

        
        <div className="mb-7">
          <h1 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
            MY PLAN
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

       
        <div className="mb-5 grid grid-cols-1 overflow-hidden rounded-lg border border-[#25262b] bg-[#15161b] sm:grid-cols-3">

         
          <div className="border-b border-[#25262b] p-4 sm:border-b-0 sm:border-r">
            <p className="text-[9px] text-gray-500">
              Exercises
            </p>

            <p className="mt-1 text-2xl font-black text-[#ccff00]">
              {todayPlan.length}
            </p>
          </div>

         
          <div className="border-b border-[#25262b] p-4 sm:border-b-0 sm:border-r">
            <p className="text-[9px] text-gray-500">
              Minutes
            </p>

            <p className="mt-1 text-2xl font-black">
              {totalMinutes}
            </p>
          </div>

          
          <div className="p-4">
            <p className="text-[9px] text-gray-500">
              Calories
            </p>

            <p className="mt-1 text-2xl font-black">
              {totalCalories}
            </p>
          </div>
        </div>

        
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

         
          <div className="flex w-fit rounded-md border border-[#25262b] bg-[#15161b] p-1">

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

         
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-gray-500">
              Sort By
            </span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as SortOption)
                }
                className="appearance-none rounded-md border border-[#303138] bg-[#15161b] px-3 py-1.5 pr-7 text-[9px] text-white outline-none transition hover:border-[#55565b] focus:border-[#ccff00]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

            
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-gray-400">
                ˅
              </span>
            </div>
          </div>

        </div>

       
{loading ? (
  <div className="flex min-h-[260px] items-center justify-center rounded-lg border border-[#25262b] bg-[#0d0e11]">
    <p className="text-xs text-gray-500">
      Loading workouts…
    </p>
  </div>
) : sortedWorkouts.length === 0 ? (
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

          
          <div className="space-y-3">

            {sortedWorkouts.map((workout) => {
              const isCompleted = completedWorkouts.includes(
                workout.id
              );

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

                    
                    <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-52">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 208px"
                        className="object-cover"
                      />
                    </div>

                   
                    <div className="flex min-w-0 flex-1 items-center justify-between gap-6 p-4">

                     
                      <div>
                        <div>
                          <h3
                            className={`text-sm font-black uppercase ${
                              isCompleted
                                ? "line-through text-gray-500"
                                : "text-white"
                            }`}
                          >
                            {workout.name}
                          </h3>

                          <p className="mt-1 text-[10px] text-gray-500">
                            {workout.equipment}
                          </p>
                        </div>

                       
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

                      
                      <div className="flex shrink-0 items-center justify-end gap-2">

                       
                        <Link
                          href={`/workout/${workout.id}`}
                          className="whitespace-nowrap rounded-full border border-[#30333a] px-4 py-2 text-[9px] font-medium text-white transition hover:border-[#55565b] hover:bg-[#202126]"
                        >
                          View Details
                        </Link>

                        
                        {activeTab === "plan" && (
                          <button
                            onClick={() =>
                              handleMarkAsDone(
                                workout.id,
                                workout.name
                              )
                            }
                            className="flex items-center gap-1 whitespace-nowrap rounded-full bg-[#ccff00] px-4 py-2 text-[9px] font-bold text-black transition hover:bg-[#b8e600]"
                          >
                            <span>✓</span>
                            {isCompleted
                              ? "Done"
                              : "Mark as Done"}
                          </button>
                        )}

                       
<button
  onClick={() =>
    handleRemove(
      workout.id,
      activeTab
    )
  }
  className="ml-1 flex h-7 w-5 shrink-0 items-center justify-center text-lg leading-none text-gray-500 transition hover:text-red-400"
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