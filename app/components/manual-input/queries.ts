import { apiClient } from "@/lib/api-client";
import { nonEmptyString } from "@/schemas/non-empty-string";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

const manualInputRequestSchema = z.object({
  lcLenLocal: nonEmptyString,
  lcLenGlobal: nonEmptyString,
  lcLenUnfolded: nonEmptyString,
  centroidLen: nonEmptyString,
  numScalarFeatures: nonEmptyString,
});
type ManualInputRequest = z.infer<typeof manualInputRequestSchema>;

const manualInput200ResponseSchema = z.object({});

const manualInput = async (data: ManualInputRequest) => {
  const response = await apiClient.post("/manual-input", data);
  return manualInput200ResponseSchema.parse(response.data);
};

export const useManualInput = () => {
  const mutation = useMutation({
    mutationKey: ["manual-input"],
    mutationFn: manualInput,
    throwOnError: true,
  });

  return mutation;
};
