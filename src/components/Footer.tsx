import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1f2025] bg-[#0b0c0f]">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-7 py-5 sm:px-6 lg:px-8">

        
        
        <Link
        href="/"
         className="flex items-center gap-2">
         <Image
             src="/assets/logo.png"
             alt="FitLog"
             width={70}
             height={24}
             className="h-auto w-auto"
           />
          <span className="text-[10px] font-black uppercase text-white">
            FITLOG
          </span>
          </Link>

       

        
        <p className="text-[8px] text-gray-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}