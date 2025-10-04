"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RocketIcon, SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { nonEmptyString } from "@/schemas/non-empty-string";

export const FormSchema = z.object({
  id: nonEmptyString
    .max(5, { error: "Field must be 5 characters at maximum." })
    .refine((val) => /^\d+$/.test(val), {
      error: "Field must contain only numbers.",
    }),
});

export default function KepId() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: "",
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
                  name="id"
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
                <Button type="submit" variant="secondary" size="icon">
                  <SendIcon />
                </Button>
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
