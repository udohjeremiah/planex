import SpaceBackground from "@/components/space-background";

import CSVFileUpload from "./components/csv-file-upload";
import IdSearch from "./components/id-search";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4">
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
      <IdSearch />
      <CSVFileUpload />
    </main>
  );
}
