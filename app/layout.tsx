import type { Metadata, Viewport } from "next";
import { DM_Mono, Fraunces, Syne } from "next/font/google";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import CustomCursor from "@/components/CustomCursor";
import PwaRegister from "@/components/PwaRegister";
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
  manifest: "/manifest.webmanifest",
  applicationName: "Sheikh Sukur Ali",
  keywords: [
    "Sheikh Sukur Ali",
    "Full Stack Developer",
    "Portfolio",
    "PWA",
    "Web App",
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Sukur Ali",
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  icons: {
    apple: [{ url: "/apple-icon" }],
    icon: [
      { url: "/icon?size=192", sizes: "192x192", type: "image/png" },
      { url: "/icon?size=512", sizes: "512x512", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    { media: "(prefers-color-scheme: light)", color: "#fafbfd" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const themeInitScript = `(function(){try{var s=localStorage.getItem('aali-theme');var t=(s==='light'||s==='dark')?s:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${syne.variable} ${dmMono.variable} ${fraunces.variable}`}
      >
        <PwaRegister />
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
