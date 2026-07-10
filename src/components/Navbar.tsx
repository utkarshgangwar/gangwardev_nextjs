"use client";

import { NAVBAR_ROUTES } from "../constants/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav
      className="
        sticky top-0 z-50 w-full 
        bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md
        border-b dark:border-slate-700/50 border-slate-200/60
        transition-colors duration-550
      "
    >
      {/* 
        - max-w-7xl limits the width on massive desktop monitors.
        - flex-wrap allows items to drop to a second line neatly if the phone screen is extremely small.
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-5 md:justify-center gap-y-2 py-3">
        {/* Navigation Links container */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-16 font-thin">
          {NAVBAR_ROUTES.map((route) => {
            const isActive = pathname === route.path;

            return (
              <Link
                className="text-sm sm:text-base duration-250 transition-transform ease-in-out hover:-translate-y-1 uppercase relative py-1 shrink-0"
                key={route.name}
                href={route.path}
              >
                {route.name}

                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] sm:h-[4px] rounded-full bg-gradient-to-r from-red-500 via-purple-500 to-indigo-500 shadow-[0_1px_8px_rgba(99,102,241,0.4)]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Theme Toggle Wrapper */}
        <div className="md:ml-10 flex items-center shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
