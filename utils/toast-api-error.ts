import { isServer } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { problemDetails } from "@/schemas/problem-details";

/**
 * Display a toast notification for API errors in the client.
 *
 * - Skips execution on the server.
 * - Attempts to parse the API error response using `problemDetails`.
 *   - If valid, shows the error title and detail from the response.
 * - If status is >= 500, shows a generic "Something went wrong".
 * - In development mode:
 *   - Shows "Validation error" for `ZodError`s
 *   - Falls back to "Something went wrong" otherwise.
 *
 * @param apiError - The AxiosError object from a failed API request
 * @returns A toast notification (or nothing if conditions are not met)
 */
export const toastApiError = (apiError: AxiosError) => {
  if (isServer) return;

  const apiErrorResponse = apiError.response?.data;
  if (apiErrorResponse) {
    const parsedError = problemDetails.safeParse(apiErrorResponse);
    if (parsedError.success) {
      return toast.error(parsedError.data.title, {
        description: parsedError.data.detail,
      });
    }
  }

  if (apiError.response?.status && apiError.response.status >= 500) {
    return toast.error("Something went wrong");
  }

  if (process.env.NODE_ENV === "development") {
    if (apiError.name === "ZodError") {
      return toast.error("Validation error");
    }

    toast.error("Something went wrong");
  }
};
