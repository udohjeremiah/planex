"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ExternalLinkIcon, LoaderIcon } from "lucide-react";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSolarSystem } from "@/providers/solar-provider";
import { nonEmptyString } from "@/schemas/non-empty-string";
import { catchError } from "@/utils/catch-error";
import { cn } from "@/utils/cn";

import { ManualInput200Response, useManualInput } from "./queries";

const numericString = nonEmptyString.refine((value) => /^\d+$/.test(value), {
  error: "Field must contain only numbers.",
});

export const FormSchema = z.object({
  lc_local: numericString,
  lc_global: numericString,
  lc_unfolded: numericString,
  centroid: numericString,
  scalar_features: numericString,
});

export default function ManualInput() {
  const mutation = useManualInput();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      lc_local: "",
      lc_global: "",
      lc_unfolded: "",
      centroid: "",
      scalar_features: "",
    },
  });
  const { setOpen: setOpenModal } = useModal();
  const { setVisible: setSolarSystem } = useSolarSystem();
  const [result, setResult] = useState<ManualInput200Response | undefined>();

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
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-2 py-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="lc_local"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Local Folded Light Curve</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="201"
                            className="bg-input"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lc_global"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Global Folded Light Curve</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="2001"
                            className="bg-input"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lc_unfolded"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Unfolded Light Curve</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="4000"
                            className="bg-input"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="centroid"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Centroid Time Series</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="2001"
                            className="bg-input"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="scalar_features"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Diagnostic Scalar Features</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="30"
                          className="bg-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={form.formState.isSubmitting} type="submit">
                  {form.formState.isSubmitting ? (
                    <LoaderIcon className="size-4 animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </Form>
            <p className="text-muted-foreground text-sm font-medium">
              * Exominer model accuracy score is 99%
            </p>
          </div>
          <Modal>
            <ModalBody>
              <ModalContent className="p-0 md:p-0">
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
                          label: "Classification",
                          value: result.class,
                          emoji: "🪐",
                          isLink: false,
                        },
                        {
                          label: "Confidence Score",
                          value: `${result.confidence.toFixed(2)}%`,
                          emoji: "🌟",
                          isLink: false,
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
