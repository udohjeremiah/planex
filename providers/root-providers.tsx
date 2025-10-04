"use client";

import ThemeProvider from "@/providers/theme-provider";
import { ReactNode } from "react";
import ToasterProvider from "@/providers/toast-provider";

export default function RootProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToasterProvider>{children}</ToasterProvider>
    </ThemeProvider>
  );
}
