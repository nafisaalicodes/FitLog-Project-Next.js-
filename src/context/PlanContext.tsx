"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
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
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [loading] = useState(false);

  const loadedRef = useRef(false);

  // Load data from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedPlan = localStorage.getItem("fitlog-today-plan");
      const savedLater = localStorage.getItem("fitlog-saved");

      if (savedPlan) {
        setTodayPlan(JSON.parse(savedPlan));
      }

      if (savedLater) {
        setSavedWorkouts(JSON.parse(savedLater));
      }

      loadedRef.current = true;
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save today's plan
  useEffect(() => {
    if (!loadedRef.current) return;

    localStorage.setItem(
      "fitlog-today-plan",
      JSON.stringify(todayPlan)
    );
  }, [todayPlan]);

  // Save saved workouts
  useEffect(() => {
    if (!loadedRef.current) return;

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(savedWorkouts)
    );
  }, [savedWorkouts]);

  // Add workout to today's plan
  const addToTodayPlan = (workout: Workout) => {
    if (todayPlan.length >= 5) {
      toast.info(
        "You can only add five workouts to today's plan."
      );
      return;
    }

    const alreadyExists = todayPlan.some(
      (item) => item.id === workout.id
    );

    if (alreadyExists) {
      toast.info("Already added to today's plan.");
      return;
    }

    setTodayPlan((currentPlan) => [
      ...currentPlan,
      workout,
    ]);

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

    setSavedWorkouts((currentSaved) => [
      ...currentSaved,
      workout,
    ]);

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
    throw new Error(
      "usePlan must be used inside PlanProvider"
    );
  }

  return context;
}