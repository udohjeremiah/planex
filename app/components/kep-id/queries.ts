import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { apiClient } from "@/lib/api-client";
import { nonEmptyString } from "@/schemas/non-empty-string";

const kepIdRequestSchema = z.object({ kepId: nonEmptyString });
type KepIdRequest = z.infer<typeof kepIdRequestSchema>;

const kepId200ResponseSchema = z.object({
  kepid: z.number(),
  koi_name: z.string(),
  disposition: z.string(),
  period_days: z.string(),
  radius_earth: z.string(),
  stellar_temp: z.string(),
});
export type KepId200Response = z.infer<typeof kepId200ResponseSchema>;

const kepId = async (data: KepIdRequest) => {
  const response = await apiClient.get(`/kepid/${data.kepId}`);
  return kepId200ResponseSchema.parse(response.data);
};

export const useKepId = () => {
  const mutation = useMutation({
    mutationKey: ["kep-id"],
    mutationFn: kepId,
    throwOnError: true,
  });

  return mutation;
};
