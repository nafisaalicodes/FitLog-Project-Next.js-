import Image from "next/image";
import { notFound } from "next/navigation";

import WorkoutActions from "@/components/WorkoutActions";
import { Workout } from "@/Types/Workout";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getWorkout(id: string): Promise<Workout | null> {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/fitlog",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  const workouts: Workout[] = await response.json();

  return workouts.find((workout) => String(workout.id) === id) ?? null;
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return (
    <section className="min-h-screen bg-black text-white py-10">
      <div className="mx-auto max-w-7xl px-4  sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">

          
          <div>
            <div className="relative min-h-[400px] overflow-hidden rounded-2xl bg-slate-200 lg:min-h-[650px]">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          
          <div className="flex flex-col justify-center">

          
            <h1 className="text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
              {workout.name}
            </h1>

            
            <p className="mt-4 text-base leading-7 text-gray-400">
              {workout.description}
            </p>

            
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full  bg-[#ccff00] px-4 py-1.5 text-sm font-medium text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

           
            <div className="mt-8 overflow-hidden rounded-2xl border border-[#25262b] bg-[#15161b]">
             
              <div className="divide-y divide-[#25262b]">
                <SpecRow
                  label="EQUIPMENT"
                  value={workout.equipment}
                />

                <SpecRow
                  label="DIFFICULTY"
                  value={workout.difficulty}
                />

                <SpecRow
                  label="SETS"
                  value={String(workout.sets)}
                />

                <SpecRow
                  label="REPS"
                  value={workout.reps}
                />

                <SpecRow
                  label="DURATION"
                  value={`${workout.duration} min`}
                />

                <SpecRow
                  label="CALORIES"
                  value={`${workout.caloriesBurned} kcal`}
                />

                <SpecRow
                  label="RATING"
                  value={` ${workout.rating}`}
                />
              </div>
            </div>

            
            <div className="mt-8">
              <h2 className="text-xl font-bold text-white">
                INSTRUCTIONS
              </h2>

              <ol className="mt-4 space-y-4">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-black text-sm font-bold ">
                      {index + 1}
                    </span>

                    <p className="pt-1 text-sm leading-6 text-gray-400">
                      {instruction}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

          
            <WorkoutActions workout={workout} />

          </div>
        </div>
      </div>
    </section>
  );
}

function SpecRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <span className="text-xs font-semibold tracking-wide text-slate-500">
        {label}
      </span>

      <span className="text-right text-sm font-semibold text-gray-400">
        {value}
      </span>
    </div>
  );
}