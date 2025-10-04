/**
 * Wraps a promise and returns a tuple of [error, data].
 *
 * @example
 * const [err, data] = await catchError(apiCall());
 * if (err) {
 *   console.error("❌ Failed:", err);
 * } else {
 *   console.log("✅ Success:", data);
 * }
 */
export async function catchError<T>(
  promise: Promise<T>,
): Promise<[Error, undefined] | [undefined, T]> {
  try {
    const data = await promise;
    return [undefined, data];
  } catch (error) {
    return [error as Error, undefined];
  }
}
