import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayoutClient from "@/components/layout/main-layout-client";
import ReduxProvider from "@/components/providers/redux-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NEXORA - Premium Fashion & Lifestyle",
  description: "Premium clothing and perfumes for the modern lifestyle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body 
        className={`${inter.className} min-h-full bg-background antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <ReduxProvider>
        <MainLayoutClient>
          {children}
        </MainLayoutClient>
        </ReduxProvider>
      </body>
    </html>
  );
}
