import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          FITLOG
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/workout"
            className="font-medium text-gray-500 transition hover:text-black"
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className="font-medium text-gray-500 transition hover:text-black"
          >
            My Plan
          </Link>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-[#ccff00] px-4 py-2 text-sm font-semibold">
            Plan 0
          </div>

          <div className="rounded-full border border-black px-4 py-2 text-sm font-semibold">
            Saved 0
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;