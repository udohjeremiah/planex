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
import { useSolarSystem } from "@/providers/solar-provider";
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
  const { setVisible: setSolarSystem } = useSolarSystem();
  const [result, setResult] = useState<KepId200Response | undefined>();

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const [error, result] = await catchError(mutation.mutateAsync(values));
    if (error) return;

    form.reset();
    setResult(result);
    setSolarSystem(false);
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
            <ModalBody className="overflow-y-auto">
              <ModalContent className="max-w-screen p-0 md:p-0">
                {result ? (
                  <div className="relative flex flex-col divide-y">
                    <div className="relative h-80 w-full justify-center overflow-hidden rounded-t-xl">
                      <video
                        src="/space.webm"
                        className="absolute inset-0 h-full w-full object-cover"
                        autoPlay
                        preload="auto"
                        playsInline
                        muted
                        loop
                        controls={false}
                      />
                      <div className="absolute inset-0 bg-black/40"></div>
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
                          label: "See More Info",
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
                  <div className="text-muted-foreground p-8 text-center">
                    No result available yet.
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
