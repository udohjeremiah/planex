"use client";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, LoaderIcon } from "lucide-react";
import React, { useState } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

import {
  Modal,
  ModalBody,
  ModalContent,
  useModal,
} from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { useSolarSystem } from "@/providers/solar-provider";
import { catchError } from "@/utils/catch-error";

import { CsvUpload200Response, useCsvUpload } from "./queries";

export default function CsvUpload() {
  const mutation = useCsvUpload();
  const [file, setFile] = useState<File>();
  const { setOpen: setOpenModal } = useModal();
  const { setVisible: setSolarSystem } = useSolarSystem();
  const [result, setResult] = useState<CsvUpload200Response | undefined>();
  const [currentIndex, setCurrentIndex] = useState(0);

  async function onSubmit(file: File) {
    const [error, result] = await catchError(mutation.mutateAsync({ file }));
    if (error) return;

    setFile(undefined);
    setResult(result);
    setSolarSystem(false);
    setOpenModal(true);
    setCurrentIndex(0);
  }

  const nextSlide = () => {
    if (!result) return;
    setCurrentIndex((previous) => (previous + 1) % result.predictions.length);
  };

  const previousSlide = () => {
    if (!result) return;
    setCurrentIndex((previous) =>
      previous === 0 ? result.predictions.length - 1 : previous - 1,
    );
  };

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
                    <div className="animate-fade-in-up relative p-6 md:p-8">
                      <div className="my-4 flex items-center justify-center gap-6">
                        <Button
                          onClick={previousSlide}
                          variant="outline"
                          size="lg"
                        >
                          <ChevronLeft className="size-4" /> Prev
                        </Button>
                        <h3 className="text-center text-lg font-semibold text-indigo-300">
                          Number of Records: {result.num_records}
                        </h3>
                        <Button onClick={nextSlide} variant="outline" size="lg">
                          Next <ChevronRight className="size-4" />
                        </Button>
                      </div>
                      <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm">
                        {result.predictions.length > 0 ? (
                          <div className="transition-all duration-500">
                            <div className="text-center">
                              <h4 className="mb-2 font-semibold text-indigo-200">
                                Prediction {currentIndex + 1} of{" "}
                                {result.predictions.length}
                              </h4>
                              <p className="mb-1">
                                <span className="font-semibold">Result:</span>{" "}
                                {result.predictions[currentIndex].Prediction}
                              </p>
                              <p className="mb-1">
                                <span className="font-semibold">
                                  Confidence:
                                </span>{" "}
                                {result.predictions[
                                  currentIndex
                                ].Confidence.toFixed(2)}
                                %
                              </p>
                              <p className="text-muted-foreground text-sm">
                                Local LC:{" "}
                                {result.predictions[currentIndex].lc_local}
                              </p>
                              <p className="text-muted-foreground text-sm">
                                Global LC:{" "}
                                {result.predictions[currentIndex].lc_global}
                              </p>
                              <p className="text-muted-foreground text-sm">
                                Unfolded LC:{" "}
                                {result.predictions[currentIndex].lc_unfolded}
                              </p>
                              <p className="text-muted-foreground text-sm">
                                Centroid:{" "}
                                {result.predictions[currentIndex].centroid}
                              </p>
                              <p className="text-muted-foreground text-sm">
                                Scalar Features:{" "}
                                {
                                  result.predictions[currentIndex]
                                    .scalar_features
                                }
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-foreground/70 text-center">
                            No predictions available.
                          </p>
                        )}
                      </div>
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
  return (
    <div role="alert" className="p-4 text-center text-red-500">
      <p>Something went wrong:</p>
      <pre className="whitespace-pre-wrap">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="mt-2 rounded bg-red-500 px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}
