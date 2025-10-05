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
import { catchError } from "@/utils/catch-error";

import { CsvUpload200Response, useCsvUpload } from "./queries";

export default function CsvUpload() {
  const mutation = useCsvUpload();
  const [file, setFile] = useState<File>();
  const { setOpen: setOpenModal } = useModal();
  const [result, setResult] = useState<CsvUpload200Response | undefined>();
  const [currentIndex, setCurrentIndex] = useState(0);

  async function onSubmit(file: File) {
    const [error, result] = await catchError(mutation.mutateAsync({ file }));
    if (error) return;

    setFile(undefined);
    setResult(result);
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
                    {/* 🌍 Planet Info */}
                    <div className="animate-fade-in-up relative p-6 md:p-8">
                      <h3 className="mb-4 text-center text-lg font-semibold text-indigo-300">
                        Number of Records: {result.num_records}
                      </h3>
                      {/* Carousel */}
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
                            {/* Navigation Buttons */}
                            <div className="mt-6 flex items-center justify-center gap-6">
                              <Button
                                onClick={previousSlide}
                                variant="outline"
                                size="lg"
                              >
                                <ChevronLeft className="size-4" /> Prev
                              </Button>
                              <Button
                                onClick={nextSlide}
                                variant="outline"
                                size="lg"
                              >
                                Next <ChevronRight className="size-4" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-center text-white/70">
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
