import type { Metadata } from "next";
import TechCanvas from "../../components/Stacks-Animation/page";

export const metadata: Metadata = {
  title: "Tech Stack & Skills",
  description:
    "Explore the core technical expertise and programming frameworks utilized by Utkarsh Gangwar, including Node.js, React, Next.js, AWS, and Python.",
  keywords: [
    "Utkarsh Gangwar skills",
    "MERN Stack tools",
    "Backend architecture technologies",
    "DevOps and databases",
    "gangwardev",
    "gangwar dev",
  ],
};

const techStack = [
  { name: "NODE.JS", iconId: "nodejs" },
  { name: "REACT.JS", iconId: "react" },
  { name: "MongoDB", iconId: "mongodb" },
  { name: "HTML", iconId: "html" },
  { name: "CSS", iconId: "css" },
  { name: "MySQL", iconId: "mysql" },
  { name: "C", iconId: "c" },
  { name: "C++", iconId: "cplusplus" },
  { name: "Angular.js", iconId: "angular" },
  { name: "AWS EC2", iconId: "ec2" },
  { name: "GCP", iconId: "gcp" },
  { name: "Redux Toolkit", iconId: "redux" },
  { name: "Bootstrap", iconId: "bootstrap" },
  { name: "Tailwind CSS", iconId: "tailwindcss" },
  { name: "DynamoDB", iconId: "dynamodb" },
  { name: "SST", iconId: "sst" },
  { name: "Python", iconId: "python" },
  { name: "Retool", iconId: "retool" },
  { name: "Lambda", iconId: "lambda" },
  { name: "Socket.IO", iconId: "socketio" },
  { name: "React Native", iconId: "reactnative" },
  { name: "Next.js", iconId: "nextjs" },
];

export default function Page() {
  return <TechCanvas techStack={techStack} />;
}
