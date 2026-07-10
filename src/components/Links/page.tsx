import { LINKS } from "../../constants/home";
import Link from "next/link";

export default function Links() {
  return (
    <div className="flex flex-wrap gap-4">
      {LINKS.map((item, index) => {
        return (
          <Link
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            href={item.url}
            className="hover:underline hover:text-green-700 transition-colors duration-300"
          >
            {item.icon && <item.icon className="inline-block mr-2 size-10" />}
          </Link>
        );
      })}
    </div>
  );
}
