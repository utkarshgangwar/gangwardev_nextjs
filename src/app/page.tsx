import type { Metadata } from "next";
import HomePage from "../components/Home/page";

export const metadata: Metadata = {
  title: "Utkarsh Gangwar | MERN Stack & AI Developer",
  description:
    "Portfolio of Utkarsh Gangwar, a Software Developer specializing in the MERN stack, Next.js, and Generative AI systems.",
  keywords: [
    "Utkarsh Gangwar",
    "MERN Stack Developer",
    "Software Developer Portfolio",
    "Next.js Portfolio",
    "React.js Portfolio",
  ],
};

export default function Home() {
  return <HomePage />;
}
