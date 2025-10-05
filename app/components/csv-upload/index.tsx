"use client";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import React, { useState } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useModal,
} from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { catchError } from "@/utils/catch-error";

import { useCsvUpload } from "./queries";

export default function CsvUpload() {
  const mutation = useCsvUpload();
  const [file, setFile] = useState<File>();
  const { setOpen: setOpenModal } = useModal();

  async function onSubmit(file: File) {
    const [error, data] = await catchError(mutation.mutateAsync({ file }));
    if (error) return;

    setFile(undefined);
    setOpenModal(true);
    console.log(data);
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
