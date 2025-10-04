"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

const numericString = nonEmptyString
  .max(5, { error: "Field must be 5 characters at maximum." })
  .refine((value) => /^\d+$/.test(value), {
    error: "Field must contain only numbers.",
  });

export const FormSchema = z.object({
  lcLenLocal: numericString,
  lcLenGlobal: numericString,
  lcLenUnfolded: numericString,
  centroidLen: numericString,
  numScalarFeatures: numericString,
});

export default function ManualInput() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      lcLenLocal: "",
      lcLenGlobal: "",
      lcLenUnfolded: "",
      centroidLen: "",
      numScalarFeatures: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">
            {JSON.stringify(data, undefined, 2)}
          </code>
        </pre>
      ),
    });
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
                    name="lcLenLocal"
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
                    name="lcLenGlobal"
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
                    name="lcLenUnfolded"
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
                    name="centroidLen"
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
                  name="numScalarFeatures"
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
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
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
