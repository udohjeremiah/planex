"use client";

import { FileUpIcon, LightbulbIcon, TextCursorInputIcon } from "lucide-react";
import Link from "next/link";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Cover } from "@/components/ui/cover";

const items = [
  {
    href: "?app=kep-id",
    title: "KEP ID",
    description:
      "Enter a Kepler Object of Interest (KOI) or KEP ID to instantly fetch and analyze its light curve from NASA's exoplanet archive.",
    header: (
      <div className="relative flex h-full min-h-[6rem] items-center justify-center rounded-xl bg-gradient-to-br from-indigo-900 via-purple-800 to-black">
        <div className="absolute h-12 w-12 animate-ping rounded-full bg-blue-400 opacity-75" />
        <div className="relative z-10 text-sm font-semibold text-white">
          Planet ID Scan
        </div>
      </div>
    ),
    icon: <LightbulbIcon className="text-muted-foreground size-4" />,
  },
  {
    href: "?app=manual-input",
    title: "Manual Input",
    description:
      "Manually input observational data points — Planex's AI will process your values and predict potential exoplanet signatures.",
    header: (
      <div className="flex h-full min-h-[6rem] items-center justify-center rounded-xl bg-gradient-to-br from-emerald-700 via-teal-700 to-black">
        <div className="flex gap-1">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="h-8 w-1 animate-pulse rounded-full bg-emerald-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    ),
    icon: <TextCursorInputIcon className="text-muted-foreground size-4" />,
  },
  {
    href: "?app=csv-upload",
    title: "CSV Upload",
    description:
      "Upload your own light curve dataset as a CSV file to let Planex run deep AI analysis and flag possible exoplanet candidates.",
    header: (
      <div className="relative flex h-full min-h-[6rem] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-amber-600 via-yellow-500 to-black">
        <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_70%)]" />
        <div className="z-10 text-sm font-semibold text-white">
          Upload & Analyze
        </div>
      </div>
    ),
    icon: <FileUpIcon className="text-muted-foreground size-4" />,
  },
];

export default function Hero() {
  return (
    <main className="mx-auto flex h-full w-full max-w-4xl flex-1 flex-col items-center justify-center gap-8 p-4 py-10 sm:p-8 md:p-10">
      <h1 className="relative z-20 mx-auto bg-clip-text text-center text-4xl font-semibold md:text-5xl lg:text-6xl">
        Discover new worlds <br /> at <Cover>light speed</Cover>
      </h1>
      <BentoGrid className="mx-auto w-full gap-4">
        {items.map((item, index) => (
          <Link href={item.href} key={index}>
            <BentoGridItem
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
            />
          </Link>
        ))}
      </BentoGrid>
    </main>
  );
}
