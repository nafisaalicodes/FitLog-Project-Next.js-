export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0c0f] text-white">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#25262b] border-t-[#ccff00]" />

        <p className="mt-4 text-xs font-bold uppercase text-gray-500">
          Loading workouts...
        </p>
      </div>
    </main>
  );
}