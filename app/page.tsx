import { Metadata } from "next";
import { Suspense } from "react";
import ReactDOM from "react-dom";

import Home from "./components/home";

export const metadata: Metadata = {
  title: "Planex — Discover New Worlds with AI",
  description:
    "Planex transforms NASA's open exoplanet data into cosmic discoveries. Enter a KEP ID, upload a CSV, or input data manually to detect potential exoplanets using AI-powered analysis.",
};

export default function Page() {
  ReactDOM.preload("/planets/sun.png", { as: "image" });
  ReactDOM.preload("/space.webm", { as: "video", type: "video/webm" });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}
