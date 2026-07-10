"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Style from "./page.module.css";

interface PaintingSliderProps {
  paintings: (string | StaticImageData)[];
}

export default function PaintingSlider({ paintings }: PaintingSliderProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);

  // Auto-slide carousel interval loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % paintings.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [paintings.length]);

  return (
    <>
      {/* Slider Container Box */}
      <div
        className={`${Style.cover} group relative w-full md:h-72 cursor-pointer overflow-hidden`}
        onClick={() => setOpenModal(true)}
      >
        {/* Custom Tooltip on Hover */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-950/80 text-white text-[11px] font-mono py-1 px-2.5 rounded opacity-100 transition-opacity duration-200 z-20 pointer-events-none whitespace-nowrap shadow-md">
          Some of my paintings, click to open 🎨
        </div>
        {paintings.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={img}
              alt={`Painting artwork ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ))}
      </div>

      {/* LIGHTWEIGHT FULL PORTAL MODAL VIEW */}
      {openModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className={`${Style.modalContainer} relative max-w-5xl w-full flex flex-col items-center bg-slate-900/40 p-2 rounded-2xl border border-slate-800/50 shadow-2xl`}
          >
            {/* Changed z-10 to z-50 to ensure it cuts through the image wrapper layer */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 text-white bg-slate-950/60 hover:bg-slate-800 p-2 rounded-full backdrop-blur-sm active:scale-90 transition-all z-50 cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div
              className={`${Style.modalImageWrapper} relative w-full h-[75vh] md:h-[80vh]`}
            >
              <Image
                src={paintings[currentSlide]}
                alt="Expanded painting gallery preview"
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 80vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
