import Link from "next/link";
import RobotBossGame from "../components/Stickman/page";

export default function NotFound() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 text-center select-none">
      <RobotBossGame />
      <div className="space-y-4">
        <h1 className="text-8xl md:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-indigo-600 animate-pulse">
          404
        </h1>

        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-950 dark:text-zinc-50">
          Page Not Found • <br /> Defeat the Robot Boss to Return Home
        </h2>
      </div>

      {/* Action Buttons Platform */}
      {/* <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3 font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-md shadow-blue-500/10 dark:shadow-none transition-all duration-150 text-center"
        >
          Return Home
        </Link>

        <Link
          href="/contact"
          className="w-full sm:w-auto px-6 py-3 font-bold text-sm text-slate-700 dark:text-zinc-300 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-slate-200/60 dark:border-zinc-800 active:scale-[0.98] rounded-xl transition-all duration-150 text-center"
        >
          Report Issue
        </Link>
      </div> */}

      {/* Decorative Footer Detail */}
      {/* <div className="mt-16 text-[0.65rem] font-mono tracking-widest text-slate-400 dark:text-zinc-600 uppercase">
        Error_Code: ERR_ROUTE_MISSING
      </div> */}
    </div>
  );
}
