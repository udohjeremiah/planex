"use client";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import React, { useState } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { useCsvUpload } from "./queries";
import { toast } from "sonner";
import { catchError } from "@/utils/catch-error";
import { LoaderIcon } from "lucide-react";

export default function CsvUpload() {
  const mutation = useCsvUpload();
  const [file, setFile] = useState<File>();

  async function onSubmit(file: File) {
    const [error, data] = await catchError(mutation.mutateAsync({ file }));
    if (error) return;

    setFile(undefined);
    console.log(data);
    toast("");
  }

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary FallbackComponent={Fallback} onReset={reset}>
          <div className="mx-auto min-h-96 w-full max-w-4xl rounded-lg border border-dashed">
            <FileUpload
              title="Upload CSV File"
              description="Drag or drop your CSV file here or click to upload."
              accept=".csv"
              onChange={setFile}
            />
            {file && (
              <div className="flex items-center justify-center px-10 pb-10">
                <Button
                  onClick={() => onSubmit(file!)}
                  disabled={mutation.isPending}
                  className="w-full max-w-xl"
                >
                  {mutation.isPending ? (
                    <LoaderIcon className="size-4 animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            )}
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
