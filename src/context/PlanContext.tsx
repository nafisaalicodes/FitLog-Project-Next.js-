"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { toast } from "react-toastify";
import type { Workout } from "@/Types/Workout";

interface PlanContextType {
  todayPlan: Workout[];
  savedWorkouts: Workout[];
  loading: boolean;
  addToTodayPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  removeFromTodayPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(
  undefined
);

export function PlanProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [todayPlan, setTodayPlan] = useState<Workout[]>(() => {
  if (typeof window === "undefined") {
    return [];
  }

  const savedPlan = localStorage.getItem("fitlog-today-plan");

  return savedPlan ? JSON.parse(savedPlan) : [];
});

const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>(() => {
  if (typeof window === "undefined") {
    return [];
  }

  const savedLater = localStorage.getItem("fitlog-saved");

  return savedLater ? JSON.parse(savedLater) : [];
});

const [loading] = useState(false);
  // Save today's plan
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        "fitlog-today-plan",
        JSON.stringify(todayPlan)
      );
    }
  }, [todayPlan, loading]);

  // Save saved workouts
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        "fitlog-saved",
        JSON.stringify(savedWorkouts)
      );
    }
  }, [savedWorkouts, loading]);

  // Add workout to today's plan
  const addToTodayPlan = (workout: Workout) => {
    if (todayPlan.length >= 5) {
      toast.info("You can only add five workouts to today's plan.");
      return;
    }

    const alreadyExists = todayPlan.some(
      (item) => item.id === workout.id
    );

    if (alreadyExists) {
      toast.info("Already added to today's plan.");
      return;
    }

    const updatedPlan = [...todayPlan, workout];

    setTodayPlan(updatedPlan);

    toast.success("Added to today's plan.");
  };

  // Save workout for later
  const saveForLater = (workout: Workout) => {
    const alreadyExists = savedWorkouts.some(
      (item) => item.id === workout.id
    );

    if (alreadyExists) {
      toast.info("Already saved.");
      return;
    }

    const updatedSaved = [...savedWorkouts, workout];

    setSavedWorkouts(updatedSaved);

    toast.success("Saved for later.");
  };

  // Remove from today's plan
  const removeFromTodayPlan = (id: number) => {
    setTodayPlan((currentPlan) =>
      currentPlan.filter((item) => item.id !== id)
    );

    toast.info("Removed from today's plan.");
  };

  // Remove from saved
  const removeFromSaved = (id: number) => {
    setSavedWorkouts((currentSaved) =>
      currentSaved.filter((item) => item.id !== id)
    );

    toast.info("Removed from saved.");
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        loading,
        addToTodayPlan,
        saveForLater,
        removeFromTodayPlan,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
}