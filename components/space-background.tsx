"use client";

import { initParticlesEngine, Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";
import { useEffect, useMemo } from "react";

export default function SpaceBackground() {
  const { theme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  const options = useMemo(() => {
    const isDark = theme === "dark";

    return {
      background: {
        color: { value: "transparent" },
      },
      fpsLimit: 60,
      fullScreen: { enable: false },
      particles: {
        number: {
          value: 180,
          density: {
            enable: true,
            area: 800,
          },
        },
        color: {
          value: isDark
            ? ["#ffffff", "#b8d8ff", "#ffd7a5", "#c9f6ff"] // glowing stars for dark mode
            : ["#8ec5ff", "#ffc8dd", "#ffd6a5", "#b8e4c9"], // pastel cosmic colors for light mode
        },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.3, max: 1 },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.3,
            sync: false,
          },
        },
        size: {
          value: { min: 0.5, max: 1.8 },
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "out",
          },
        },
      },
      detectRetina: true,
    } as const;
  }, [theme]);

  return (
    <div className="fixed inset-0 -z-10">
      <Particles id="tsparticles" options={options} />
    </div>
  );
}
