import { HOME_SECTIONS } from "../../constants/home";
import classes from "./home.module.css";
import Image from "next/image";
// import StickmanShooter from "../Stickman/page";
import Links from "../Links/page";

export default async function HomePage() {
  return (
    <main className="flex items-center justify-center gap-10 h-full flex-col py-6 my-6">
      <title>Utkarsh</title>
      <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
        <div>
          <Image
            src="/kudremukh.jpg"
            loading="eager"
            alt="Utkarsh Gangwar"
            width={800} // Replace with your image's actual pixel width
            height={600} // Replace with your image's actual pixel height
            className="w-[300px] h-auto border rounded-full" // Restricts the display size to 300px wide layout-wise
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-5 text-center md:text-left p-4">
          <p className="text-5xl font-bold">
            Hi, I'm&nbsp;
            <span className="bg-gradient-to-br from-[#a668ff] to-[#00ffa4] bg-clip-text text-transparent">
              Utkarsh
            </span>
            <span className={classes.wiggle}>🤚</span>
            <br />
            <span className="bg-gradient-to-r from-[#FF9933] via-[#D3D3D3] to-[#138808] bg-clip-text text-transparent">
              A Developer
            </span>
          </p>
          <div className="flex flex-col items-start justify-center gap-2">
            {HOME_SECTIONS.map((items, index) => (
              <div
                key={index}
                className="flex items-center gap-2 mb-2
            duration-250 transition-transform ease-in-out hover:-translate-y-1 text-lg cursor-pointer"
              >
                <span>{items.icon}</span>
                <p>{items.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Links />
    </main>
  );
}
