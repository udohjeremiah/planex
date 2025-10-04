import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { apiClient } from "@/lib/api-client";
import { nonEmptyString } from "@/schemas/non-empty-string";

const kepIdRequestSchema = z.object({ kepId: nonEmptyString });
type KepIdRequest = z.infer<typeof kepIdRequestSchema>;

const kepId200ResponseSchema = z.object({});

const kepId = async (data: KepIdRequest) => {
  const response = await apiClient.post("/kep-id", data);
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
