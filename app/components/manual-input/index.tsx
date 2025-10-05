"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
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
import { nonEmptyString } from "@/schemas/non-empty-string";
import { catchError } from "@/utils/catch-error";

import { useManualInput } from "./queries";

const numericString = nonEmptyString
  .max(5, { error: "Field must be 5 characters at maximum." })
  .refine((value) => /^\d+$/.test(value), {
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

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const [error, data] = await catchError(mutation.mutateAsync(values));
    if (error) return;

    form.reset();
    setOpenModal(true);
    console.log(data);
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
                          <Input placeholder="201" {...field} />
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
                          <Input placeholder="2001" {...field} />
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
                          <Input placeholder="4000" {...field} />
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
                          <Input placeholder="2001" {...field} />
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
                        <Input placeholder="30" {...field} />
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
          </div>
          <Modal>
            <ModalBody>
              <div className="flex items-center justify-center py-40">
                <ModalContent>
                  <h4 className="mb-8 text-center text-lg font-bold text-neutral-600 md:text-2xl dark:text-neutral-100">
                    Book your trip to{" "}
                    <span className="rounded-md border border-gray-200 bg-gray-100 px-1 py-0.5 dark:border-neutral-700 dark:bg-neutral-800">
                      Bali
                    </span>{" "}
                    now! ✈️
                  </h4>
                </ModalContent>
                <ModalFooter className="gap-4">
                  <button className="w-28 rounded-md border border-gray-300 bg-gray-200 px-2 py-1 text-sm text-black dark:border-black dark:bg-black dark:text-white">
                    Cancel
                  </button>
                  <button className="w-28 rounded-md border border-black bg-black px-2 py-1 text-sm text-white dark:bg-white dark:text-black">
                    Book Now
                  </button>
                </ModalFooter>
              </div>
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
