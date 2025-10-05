"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";

import { ModalProvider } from "@/components/ui/animated-modal";
import { getQueryClient } from "@/lib/tanstack-query";
import ThemeProvider from "@/providers/theme-provider";

import { SolarSystemProvider } from "./solar-provider";
import ToasterProvider from "./toaster-provider";

export default function RootProviders({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SolarSystemProvider>
          <ToasterProvider>
            <ModalProvider>{children}</ModalProvider>
          </ToasterProvider>
        </SolarSystemProvider>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
