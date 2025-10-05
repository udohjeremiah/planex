"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface SolarSystemContextType {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const SolarSystemContext = createContext<SolarSystemContextType | undefined>(
  undefined,
);

export function SolarSystemProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);

  return (
    <SolarSystemContext.Provider value={{ visible, setVisible }}>
      {children}
    </SolarSystemContext.Provider>
  );
}

export function useSolarSystem() {
  const context = useContext(SolarSystemContext);
  if (!context) {
    throw new Error("useSolarSystem must be used within a SolarSystemProvider");
  }
  return context;
}
