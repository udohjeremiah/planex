import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { apiClient } from "@/lib/api-client";

const csvUploadRequestSchema = z.object({
  file: z.instanceof(File),
});
type CsvUploadRequest = z.infer<typeof csvUploadRequestSchema>;

const csvUploadResponseSchema = z.object({
  num_records: z.number(),
  predictions: z.array(
    z.object({
      lc_local: z.number(),
      lc_global: z.number(),
      lc_unfolded: z.number(),
      centroid: z.number(),
      scalar_features: z.number(),
      Prediction: z.string(),
      Confidence: z.number(),
    }),
  ),
});

const csvUpload = async (data: CsvUploadRequest) => {
  const formData = new FormData();
  formData.append("file", data.file);

  const response = await apiClient.post("/predict/csv", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return csvUploadResponseSchema.parse(response.data);
};

export const useCsvUpload = () => {
  return useMutation({
    mutationKey: ["csv-upload"],
    mutationFn: csvUpload,
    throwOnError: true,
  });
};
