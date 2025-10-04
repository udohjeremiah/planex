import { z } from "zod";

import { nonEmptyString } from "./non-empty-string";

/**
 * Zod schema for HTTP Problem Details (RFC 7807)
 */
export const problemDetails = z
  .object({
    type: nonEmptyString.default("about:blank"),
    title: nonEmptyString,
    status: z.int().positive(),
    detail: nonEmptyString.optional(),
    instance: nonEmptyString.optional(),
  })
  .catchall(z.unknown()); // allow extension members
