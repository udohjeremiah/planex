"use client";

import { useSearchParams } from "next/navigation";

import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import SpaceBackground from "@/components/space-background";

import CsvUpload from "./components/csv-upload";
import Hero from "./components/hero";
import KepId from "./components/kep-id";
import ManualInput from "./components/manual-input";

export default function Home() {
  const searchParams = useSearchParams();
  const app = searchParams.get("app");

  if (!app) {
    return <Hero />;
  }

  return (
    <>
      <AppHeader />
      <main className="flex flex-1 flex-col items-center justify-center gap-8 p-8">
        <SpaceBackground />
        <div className="flex flex-col items-center">
          <h2 className="text-center text-2xl font-semibold">
            Welcome to Planex!
          </h2>
          <p className="text-muted-foreground text-center text-sm leading-relaxed md:text-base">
            Planex uses NASA&apos;s open exoplanet data and AI to detect new
            worlds beyond our solar system.
          </p>
        </div>
        {app === "kep-id" && <KepId />}
        {app === "manual-input" && <ManualInput />}
        {app === "csv-upload" && <CsvUpload />}
      </main>
      <AppFooter />
    </>
  );
}
