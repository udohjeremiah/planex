import { env } from "@/env";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
