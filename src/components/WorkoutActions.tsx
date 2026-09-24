"use client";

import { Workout } from "@/Types/Workout";
import { usePlan } from "@/context/PlanContext";
import { toast } from "react-toastify";

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({
  workout,
}: WorkoutActionsProps) {
  const { addToTodayPlan, saveForLater } = usePlan();

  const handleAddToPlan = () => {
    addToTodayPlan(workout);

    toast.success("Added to today's plan");
  };

  const handleSave = () => {
    saveForLater(workout);

    toast.success("Saved for later");
  };

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">

      {/* Add to Today's Plan */}
      <button
        onClick={handleAddToPlan}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-6 py-3.5 font-semibold text-black transition hover:opacity-90"
      >
        <span>＋</span>
        Add to today&apos;s plan
      </button>

      {/* Save */}
      <button
        onClick={handleSave}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-black px-6 py-3.5 font-semibold text-slate-400 transition hover:bg-slate-100"
      >
        <span>♡</span>
        Save for later
      </button>

    </div>
  );
}