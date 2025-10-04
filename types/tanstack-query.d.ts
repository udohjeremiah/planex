import type { AxiosError } from "axios";

interface CustomMeta extends Record<string, unknown> {
  errorMessage: string | undefined;
}

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
    queryMeta: CustomMeta;
    mutationMeta: CustomMeta;
  }
}
