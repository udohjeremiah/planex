"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

export default function CSVUpload() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary FallbackComponent={Fallback} onReset={reset}>
          <div className="mx-auto min-h-96 w-full max-w-4xl rounded-lg border border-dashed">
            <FileUpload
              title="Upload CSV Files"
              description="Drag or drop your CSV files here or click to upload but it must have the 5 parameters shown above on Manual Input"
              onChange={handleFileUpload}
            />
            {files.length > 0 && (
              <div className="flex items-center justify-center px-10 pb-10">
                <Button className="w-full max-w-xl">Submit</Button>
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
