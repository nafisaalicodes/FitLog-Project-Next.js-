import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/Types/Workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-lg border border-[#25262b] bg-[#15161b] transition hover:border-[#ccff00]"
    >
      
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

     
      <div className="p-4">

       
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#ccff00] px-2 py-1 text-[8px] font-black uppercase text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

       
        <h3 className="text-sm font-black uppercase text-white">
          {workout.name}
        </h3>

       
        <p className="mt-1 text-[10px] text-gray-500">
          {workout.equipment}
        </p>

        
        <div className="mt-4 flex items-center gap-4 border-t border-[#25262b] pt-3 text-[9px] text-gray-400">
          <span>◷ {workout.duration} min</span>

          <span>🔥 {workout.caloriesBurned} kcal</span>

          <span>★ {workout.rating}</span>
        </div>

      </div>
    </Link>
  );
}