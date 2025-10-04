import { z } from "zod";

/**
 * Helper for validating non-empty string fields.
 * Trims any leading/trailing whitespace and ensures the string is not empty.
 */
export const nonEmptyString = z.string().trim().min(1, {
  error: "Please provide a value for this field",
});
