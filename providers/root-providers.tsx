"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";

import { ModalProvider } from "@/components/ui/animated-modal";
import { getQueryClient } from "@/lib/tanstack-query";
import ThemeProvider from "@/providers/theme-provider";

import ToasterProvider from "./toaster-provider";

export default function RootProviders({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToasterProvider>
          <ModalProvider>{children}</ModalProvider>
        </ToasterProvider>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
