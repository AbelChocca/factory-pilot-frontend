import axios, { AxiosError, type AxiosInstance } from "axios";

export interface ApiError {
  message: string;
  status: number | null;
}

interface FastAPIErrorResponse {
  detail?: string;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<FastAPIErrorResponse>) => {
    if (error.response) {
      const message =
        error.response.data?.detail ?? "An unexpected server error occurred.";

      const apiError: ApiError = {
        message,
        status: error.response.status,
      };

      return Promise.reject(apiError);
    }

    if (error.request) {
      const apiError: ApiError = {
        message: "Unable to connect to the server.",
        status: null,
      };

      return Promise.reject(apiError);
    }

    const apiError: ApiError = {
      message: error.message || "An unexpected error occurred.",
      status: null,
    };

    return Promise.reject(apiError);
  },
);

export default apiClient;
