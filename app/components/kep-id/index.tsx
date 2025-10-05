"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import {
  ExternalLinkIcon,
  LoaderIcon,
  RocketIcon,
  SendIcon,
} from "lucide-react";
import { useState } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Modal,
  ModalBody,
  ModalContent,
  useModal,
} from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { nonEmptyString } from "@/schemas/non-empty-string";
import { catchError } from "@/utils/catch-error";
import { cn } from "@/utils/cn";

import { KepId200Response, useKepId } from "./queries";

export const FormSchema = z.object({
  kepId: nonEmptyString
    .min(4, { error: "Field must be at least 4 characters." })
    .refine((value) => /^\d+$/.test(value), {
      error: "Field must contain only numbers.",
    }),
});

export default function KepId() {
  const mutation = useKepId();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      kepId: "",
    },
  });
  const { setOpen: setOpenModal } = useModal();
  const [result, setResult] = useState<KepId200Response | undefined>();

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const [error, result] = await catchError(mutation.mutateAsync(values));
    if (error) return;

    form.reset();
    setResult(result);
    setOpenModal(true);
  }

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary FallbackComponent={Fallback} onReset={reset}>
          <div className="bg-input mx-auto flex w-full max-w-4xl items-center gap-2 rounded-full border px-2 py-2">
            <div className="bg-muted flex size-8 items-center justify-center rounded-full border p-1.5">
              <RocketIcon className="text-muted-foreground size-5" />
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full gap-2"
              >
                <FormField
                  control={form.control}
                  name="kepId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          autoFocus
                          placeholder="Enter Kep ID..."
                          className="border-none shadow-none focus-visible:border-none focus-visible:ring-0 dark:bg-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  variant="secondary"
                  size="icon"
                >
                  {form.formState.isSubmitting ? (
                    <LoaderIcon className="size-4 animate-spin" />
                  ) : (
                    <SendIcon />
                  )}
                </Button>
              </form>
            </Form>
          </div>
          <Modal>
            <ModalBody>
              <ModalContent className="p-0 md:p-0">
                {result ? (
                  <div className="relative flex flex-col divide-y overflow-hidden">
                    {/* 3D Exoplanet Visualization */}
                    <div className="relative flex h-80 w-full items-center justify-center overflow-hidden bg-black">
                      {/* Full-screen pulsating glow */}
                      <div className="animate-glow-pulse absolute inset-0 bg-gradient-to-br from-purple-500 via-indigo-400 to-blue-400 opacity-20 blur-[200px]"></div>
                      {/* Starfield behind */}
                      <div className="animate-star-shimmer absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] opacity-20"></div>
                      {/* Exoplanet sphere */}
                      <div className="animate-spin-slow relative h-36 w-36 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-[0_0_80px_rgba(139,92,246,0.8)]">
                        {/* Light shading for 3D effect */}
                        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.15),transparent)]"></div>
                        {/* Atmospheric bands */}
                        <div className="animate-band-spin-fast absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,_#ffffff10,_#ffffff05,_#ffffff10)] opacity-20"></div>
                        <div className="animate-band-spin-slow-reverse absolute inset-0 rounded-full bg-[conic-gradient(from_90deg,_#ffffff08,_#ffffff02,_#ffffff08)] opacity-15"></div>
                        {/* Cloud swirls */}
                        <div className="animate-spin-slower-reverse absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08)_5%,transparent_50%)] opacity-20"></div>
                      </div>
                      {/* Dust rings / halo layers */}
                      <div className="animate-spin-slower absolute h-44 w-44 rounded-full border border-white/10 opacity-30"></div>
                      <div className="animate-spin-slower-reverse absolute h-60 w-60 rounded-full border border-white/5 opacity-20"></div>
                    </div>
                    {/* Planet info section with fade-in */}
                    <div className="animate-fade-in-up divide-y p-6 md:p-8">
                      {[
                        {
                          label: "Unique Celestial Identifier",
                          value: result.kepid,
                          emoji: "🪐",
                          isLink: false,
                        },
                        {
                          label: "Planet Name",
                          value: result.koi_name,
                          emoji: "🌌",
                          isLink: false,
                        },
                        {
                          label: "Disposition",
                          value: result.disposition,
                          emoji: "⚡",
                          isLink: false,
                        },
                        {
                          label: "Orbital Period (days)",
                          value: result.period_days,
                          emoji: "🕒",
                          isLink: false,
                        },
                        {
                          label: "Radius (Earth)",
                          value: result.radius_earth,
                          emoji: "🌍",
                          isLink: false,
                        },
                        {
                          label: "Stellar Temp",
                          value: result.stellar_temp,
                          emoji: "☀️",
                          isLink: false,
                        },
                        {
                          label: "Kep ID Link",
                          value: `https://exoplanetarchive.ipac.caltech.edu/overview/${result.koi_name}`,
                          emoji: "🚀",
                          isLink: true,
                        },
                      ].map((item, index) => (
                        <div
                          key={item.label}
                          className={cn(
                            "animate-fade-in-up text-foreground/90 flex justify-between py-3",
                            `[animation-delay:${0.15 * index}s]`,
                          )}
                        >
                          <span className="flex items-center gap-2 font-medium">
                            <span>{item.emoji}</span> {item.label}
                          </span>
                          {item.isLink ? (
                            <a
                              href={item.value.toString()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 font-semibold text-indigo-300 transition-colors hover:text-indigo-400 hover:underline"
                            >
                              Visit <ExternalLinkIcon className="size-4" />
                            </a>
                          ) : (
                            <span className="text-foreground/80 font-semibold">
                              {item.value ?? "—"}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-muted p-8 text-center">
                    No data available yet.
                  </div>
                )}
              </ModalContent>
            </ModalBody>
          </Modal>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre className="text-red-500">{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
