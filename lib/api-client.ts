import axios from "axios";

import { env } from "@/env";

export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
