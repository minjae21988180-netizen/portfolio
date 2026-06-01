import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { Fraunces, Quicksand, Baloo_2 } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-fraunces",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-quicksand",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-baloo",
});

export const metadata: Metadata = {
  title: "Minjae Kim — Control Center Portfolio",
  description:
    "An Inside Out–inspired interactive portfolio by Minjae Kim, UX/Product & Graphic Designer in Los Angeles. Step into the control center and explore the Work, Me, and Connect islands.",
  openGraph: {
    title: "Minjae Kim — Control Center Portfolio",
    description:
      "Step into the control center — UX research, product design, and brand work across three personality islands.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#c9b6e4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${quicksand.variable} ${baloo.variable}`}
    >
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
