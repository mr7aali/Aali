import type { Metadata } from "next";
import { DM_Mono, Fraunces, Syne } from "next/font/google";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-heading",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["italic"],
  variable: "--font-accent",
});

export const metadata: Metadata = {
  title: "Sheikh Sukur Ali | Full Stack Developer",
  description:
    "Portfolio of Sheikh Sukur Ali, Full Stack Developer building scalable real-time systems and polished interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${dmMono.variable} ${fraunces.variable}`}>
        <BackgroundCanvas />
        <CustomCursor />
        <noscript>
          <style>{`
            body { cursor: auto !important; }
            a, button { cursor: pointer !important; }
            .cursor, .cursor-ring, .background-canvas { display: none !important; }
          `}</style>
        </noscript>
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}
