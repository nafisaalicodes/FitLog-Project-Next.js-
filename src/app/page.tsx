import Link from "next/link";
import Image from "next/image";
import WorkoutCard from "@/components/WorkoutCard";
import type { Workout } from "@/Types/Workout";


export default async function Home() {
  const response = await fetch(
      "https://api.abcz.workers.dev/api/fitlog"

    );

  const workouts: Workout[] = await response.json();
    
  return (
    <main className="min-h-screen bg-[#0b0c0f] text-white">

     
      <section className="px-7 py-9 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between overflow-hidden rounded-xl border border-[#25262b] bg-[#15161b] px-5 py-10 sm:px-8 sm:py-12 lg:px-16">

         
          <div className="max-w-[600px]">

           
            <p className="mb-4 text-[9px] font-bold tracking-wider text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            
            <h1 className=" text-3xl font-black uppercase leading-[0.95] tracking-tight sm:whitespace-nowrap sm:text-5xl">
              TRAIN WITH INTENT. LOG
              <br />
              EVERY SET.
            </h1>

           
            <p className="mt-4 max-w-[520px] text-xs leading-5 text-gray-400">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            
            <a
              href="#library"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-4 py-2.5 text-[9px] font-bold text-black transition hover:bg-[#b8e600]"
            >
              BROWSE WORKOUTS
            </a>

          </div>

          
          <div className="hidden h-[250px] w-[340px] shrink-0 items-center justify-center md:flex">
            <Image
              src="/banner.png"
              alt="Workout illustration"
              width={310}
              height={235}
              className="h-full w-full object-contain"
            />
          </div>

        </div>
      </section>
    
<section
  id="library"
  className="px-7 pb-12 pt-6 sm:px-6 lg:px-8"
>
  <div className="mx-auto max-w-[1400px]">

    
    <div className="mb-6">
      <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
        THE LIBRARY
      </h2>

      <p className="mt-1 text-xs text-gray-500">
        Twelve lifts covering every major muscle group.
      </p>
    </div>

   
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {workouts.map((workout) => (
        <WorkoutCard
          key={workout.id}
          workout={workout}
        />
      ))}
    </div>

  </div>
</section>
   

    </main>
  );
}