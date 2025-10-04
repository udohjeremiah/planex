"use client";

import { ReactNode } from "react";

import ThemeProvider from "@/providers/theme-provider";
import ToasterProvider from "@/providers/toast-provider";

export default function RootProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToasterProvider>{children}</ToasterProvider>
    </ThemeProvider>
  );
}
