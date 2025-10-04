import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import RootProviders from "@/providers/root-providers";
import { cn } from "@/utils/cn";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable}`,
          "flex min-h-dvh max-w-dvw flex-col antialiased",
        )}
      >
        <RootProviders>
          <AppHeader />
          {children}
          <AppFooter />
        </RootProviders>
      </body>
    </html>
  );
}
