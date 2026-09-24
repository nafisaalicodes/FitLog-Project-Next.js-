
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { toast } from "react-toastify";

import  { Workout } from "@/Types/Workout";

interface PlanContextType {
  todayPlan: Workout[];
  savedWorkouts: Workout[];

  addToTodayPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;

  removeFromTodayPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [todayPlan, setTodayPlan] = useState<Workout[]>(() => {
  if (typeof window === "undefined") return [];

  const savedPlan = localStorage.getItem("fitlog-today-plan");
  return savedPlan ? JSON.parse(savedPlan) : [];
});

const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>(() => {
  if (typeof window === "undefined") return [];

  const savedLater = localStorage.getItem("fitlog-saved");
  return savedLater ? JSON.parse(savedLater) : [];
});

  useEffect(() => {
    localStorage.setItem(
      "fitlog-today-plan",
      JSON.stringify(todayPlan)
    );
  }, [todayPlan]);

  useEffect(() => {
    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(savedWorkouts)
    );
  }, [savedWorkouts]);

  const addToTodayPlan = (workout: Workout) => {
  setTodayPlan((current) => {
    const alreadyExists = current.some(
      (item) => item.id === workout.id
    );

    if (alreadyExists) {
      toast.info("Already added to today's plan.");
      return current;
    }

    toast.success("Added to today's plan.");
    return [...current, workout];
  });
};

const saveForLater = (workout: Workout) => {
  setSavedWorkouts((current) => {
    const alreadyExists = current.some(
      (item) => item.id === workout.id
    );

    if (alreadyExists) {
      toast.info("Already saved.");
      return current;
    }

    toast.success("Saved for later.");
    return [...current, workout];
  });
};

  const removeFromTodayPlan = (id: number) => {
    setTodayPlan((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const removeFromSaved = (id: number) => {
    setSavedWorkouts((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
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