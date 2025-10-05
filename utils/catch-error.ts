/**
 * Wraps a promise and returns a tuple of [error, result].
 *
 * @example
 * const [err, result] = await catchError(apiCall());
 * if (err) {
 *   console.error("❌ Failed:", err);
 * } else {
 *   console.log("✅ Success:", result);
 * }
 */
export async function catchError<T>(
  promise: Promise<T>,
): Promise<[Error, undefined] | [undefined, T]> {
  try {
    const result = await promise;
    return [undefined, result];
  } catch (error) {
    return [error as Error, undefined];
  }
}
