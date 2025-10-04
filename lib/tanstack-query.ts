import {
  DefaultOptions,
  defaultShouldDehydrateQuery,
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";

import { toastApiError } from "@/utils/toast-api-error";

function makeQueryClient() {
  const defaultOptions: DefaultOptions = {
    queries: {
      staleTime: 3 * 60 * 1000, // 3 minutes
    },
    dehydrate: {
      // Include pending queries in dehydration
      shouldDehydrateQuery: (query) =>
        defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      shouldRedactErrors: (error) => {
        // We should not catch Next.js server errors
        // as that's how Next.js detects dynamic pages
        // so we cannot redact them.
        // Next.js also automatically redacts errors for us
        // with better digests.
        return false;
      },
    },
  };

  const queryCache = new QueryCache({
    onError: (error, query) => {
      // Only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (query.state.data !== undefined) {
        toastApiError(error);
      }
    },
  });

  const mutationCache = new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      // Automatic query invalidation after mutations. A mutation with a
      // `mutationKey` would invalidate everything related to that key only.
      // A mutation without a `mutationKey` would invalidate everything in
      // the cache. The invalidation isn't awaited or returned because we
      // want the mutations to finish as fast as possible
      queryClient.invalidateQueries({ queryKey: mutation.options.mutationKey });
    },
    onError: (error) => {
      toastApiError(error);
    },
  });

  const queryClient = new QueryClient({
    defaultOptions,
    queryCache,
    mutationCache,
  });

  return queryClient;
}

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one.
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client.
    browserQueryClient ??= makeQueryClient();
    return browserQueryClient;
  }
}

let browserQueryClient: QueryClient | undefined;
