import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Control Center — A Portfolio",
  description:
    "An interactive portfolio inspired by Inside Out's Personality Islands. Step into the control center and explore Work, Me, and Connect islands.",
  openGraph: {
    title: "Control Center — A Portfolio",
    description: "Step into the control center.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
