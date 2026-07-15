import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  fallback: ["Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Utkarsh Gangwar | MERN Stack & AI Developer",
    template: "%s | Utkarsh Gangwar",
  },
  description:
    "Portfolio of Utkarsh Gangwar, a Software Developer specializing in the MERN stack, Next.js, Node.js, React.js and Generative AI, Agentic AI systems.",
  keywords: [
    "Utkarsh Gangwar",
    "MERN Stack Developer",
    "Next.js Portfolio",
    "Software Developer India",
    "gangwardev",
    "gangwar dev",
    "gangwar",
  ],
  authors: [{ name: "Utkarsh Gangwar" }],
  creator: "Utkarsh Gangwar",
  metadataBase: new URL("https://gangwar.dev"),
  openGraph: {
    title: "Utkarsh Gangwar | Portfolio",
    description:
      "5+ years of experience specializing in building responsive, full-stack web applications.",
    url: "https://gangwar.dev",
    siteName: "Utkarsh Gangwar Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Utkarsh Gangwar Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Utkarsh Gangwar | MERN Stack & AI Developer",
    description: "Full Stack Web Application Solutions & Gen AI Integration.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* Removed the hardcoded 'dark' class and added suppressHydrationWarning */
    <html
      lang="en"
      className={`${roboto.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Anti-flash script perfectly synchronized with the React toggle and CSS overrides */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                } else if (savedTheme === 'light') {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      {/* Removed explicit utility backgrounds (bg-white dark:bg-zinc-950).
        The body now safely falls back to the layout CSS variables 
        we configured for uniform backgrounds and smooth 0.4s animations.
      */}
      <body className="min-h-screen flex flex-col">
        {/* Navbar sits at the top */}
        <Navbar />

        <main className="flex-grow min-w-full max-w-7xl m-auto">
          {children}
        </main>

        {/* Footer sits at the bottom */}
        <Footer />
      </body>
    </html>
  );
}
