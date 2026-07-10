import Link from "next/link";
import Style from "./page.module.css";
import PaintingSlider from "../../components/About-Left-Section/page";
import type { Metadata } from "next";

/* ---------- STATIC PAINTING DATA ---------- */
import p1 from "../../../public/paintings/painting1.jpg";
import p2 from "../../../public/paintings/painting2.jpg";
import p3 from "../../../public/paintings/painting3.jpg";
import p4 from "../../../public/paintings/painting4.jpg";
import p5 from "../../../public/paintings/painting5.jpg";
import p6 from "../../../public/paintings/painting6.jpg";
import p7 from "../../../public/paintings/painting7.jpg";
import p8 from "../../../public/paintings/painting8.jpg";
import p9 from "../../../public/paintings/painting9.jpg";

const SKILLS: string[] = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Node.js",
  "Express.js",
  "Nest.js",
  "SST",
  "React.js",
  "Next.js",
  "Retool",
  "MongoDB",
  "DynamoDB",
  "MySQL",
  "AWS",
  "GCP",
  "Docker",
  "System Design",
];

const PAINTINGS = [p1, p2, p3, p4, p5, p6, p7, p8, p9];

export const metadata: Metadata = {
  title: "About Utkarsh Gangwar",
  description:
    "Learn more about Utkarsh Gangwar's 5+ years of experience engineering serverless APIs, file-processing data pipelines, UI performance setups, and MERN applications.",
  keywords: [
    "Utkarsh Gangwar About",
    "MERN Stack tools",
    "Backend architecture technologies",
    "React",
    "Fullstack",
    "gangwardev",
    "gangwar dev",
    "watercolor",
  ],
};

export default async function AboutDesk() {
  return (
    <div
      id="about"
      className={`${Style.aboutRoot} w-full py-12 px-4 sm:px-6 md:px-8`}
    >
      <div
        className={`${Style.aboutGrid} max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start`}
      >
        {/* LEFT PROFILE PANEL */}
        <div
          className={`${Style.leftColumn} md:col-span-4 md:sticky md:top-8 w-full h-fit`}
        >
          <div
            className={`${Style.profileCard} rounded-2xl border shadow-xl overflow-hidden`}
          >
            <PaintingSlider paintings={PAINTINGS} />
            <div className="mt-6 text-center px-4 sm:px-6 pb-6">
              <h2 className="text-xl font-bold tracking-tight dark:text-white">
                Utkarsh Gangwar
              </h2>
              <p className="text-xs font-semibold tracking-wider uppercase text-blue-500 mt-1">
                MERN Stack Developer
              </p>

              <div className="flex items-center justify-center mt-3 gap-1 text-slate-400">
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm">
                  Indore, India (Open to relocate)
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400 break-all">
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>utkarshonwork@gmail.com</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+91 88277 68227</span>
                </div>
              </div>

              <hr className="my-5 border-slate-200 dark:border-slate-800" />

              <div className="flex flex-wrap gap-1.5 justify-center">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT WORKPLACE */}
        <div className={`${Style.rightColumn} md:col-span-8 space-y-6 w-full`}>
          <div
            className={`${Style.sectionBox} dark:bg-slate-900 dark:text-white dark:border-slate-800 rounded-2xl border shadow-sm p-6`}
          >
            <h3 className="text-lg font-bold tracking-tight flex items-center gap-2 dark:text-white">
              <span>🚀</span> Summary
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
              5 years of experience specializing in the MERN stack (MongoDB,
              Express.js, React.js, Node.js), building responsive,
              user-friendly, optimized full stack web app solutions. Currently
              advancing skills in Gen & Agentic AI with Python to develop
              production-ready systems.
            </p>
          </div>

          <div
            className={`${Style.sectionBox} dark:bg-slate-900 dark:text-white dark:border-slate-800 p-6 rounded-2xl border shadow-sm`}
          >
            <h3 className="text-lg font-bold tracking-tight flex items-center gap-2 dark:text-white">
              <span>🎯</span> Key Experience & Impact
            </h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-500">
                  Serverless APIs
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                  Engineered serverless APIs using AWS Lambda, Node.js with SST
                  framework, and TypeScript, contributing to a reduction of
                  client operation time by ~40%.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                  Data Pipelines
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                  Architected file-processing pipelines using S3 buckets and
                  improved backend logic, processing over 20K+ records per
                  batch.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-500">
                  Real-Time Sync
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                  Worked on real-time application integrations, messaging
                  workflows, and chat logic structures using WebSockets and
                  Socket.IO.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500">
                  UI Performance
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                  Enhanced client dashboard runtime utilizing React
                  Virtualization, lazy loading, layout memoization, throttling,
                  and debouncing filters.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`${Style.sectionBox} dark:bg-slate-900 dark:text-white dark:border-slate-800 p-6 rounded-2xl border shadow-sm`}
          >
            <h3 className="text-lg font-bold tracking-tight flex items-center gap-2 dark:text-white">
              <span>💻</span> Projects
            </h3>
            <div className="space-y-4 mt-3">
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                    kridastudios.com
                  </h4>
                  <Link
                    href="https://www.kridastudios.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Visit ↗
                  </Link>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  A platform to showcase and launch games.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                    gangwar.dev
                  </h4>
                  <Link
                    href="https://www.gangwar.dev"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Visit ↗
                  </Link>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Portfolio website built with: React.js, Node.js, AWS EC2,
                  Nginx.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
