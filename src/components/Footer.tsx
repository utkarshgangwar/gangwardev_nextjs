import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer
        className="text-[0.65rem] py-1 text-center antialiased
      flex flex-col justify-center items-center transition-colors duration-550"
      >
        <span>version 3.0</span>
        <Link
          href="https://kridastudios.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:text-green-700 transition-colors duration-300"
        >
          © Krida Studios 🇮🇳 <span>{new Date().getFullYear()}</span>
        </Link>
      </footer>
    </>
  );
};

export default Footer;
