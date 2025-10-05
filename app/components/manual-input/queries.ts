import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { apiClient } from "@/lib/api-client";
import { nonEmptyString } from "@/schemas/non-empty-string";

const manualInputRequestSchema = z.object({
  lc_local: nonEmptyString,
  lc_global: nonEmptyString,
  lc_unfolded: nonEmptyString,
  centroid: nonEmptyString,
  scalar_features: nonEmptyString,
});
type ManualInputRequest = z.infer<typeof manualInputRequestSchema>;

const manualInput200ResponseSchema = z.object({
  class: z.string(),
  confidence: z.number(),
});
export type ManualInput200Response = z.infer<
  typeof manualInput200ResponseSchema
>;

const manualInput = async (data: ManualInputRequest) => {
  const response = await apiClient.post("/predict/json", data);
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
