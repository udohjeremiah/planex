import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { apiClient } from "@/lib/api-client";

const csvUploadRequestSchema = z.object({
  file: z.instanceof(File),
});
type CsvUploadRequest = z.infer<typeof csvUploadRequestSchema>;

const csvUploadResponseSchema = z.object({});

const csvUpload = async (data: CsvUploadRequest) => {
  const formData = new FormData();
  formData.append("file", data.file);

  const response = await apiClient.post("/csv-upload", formData, {
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
