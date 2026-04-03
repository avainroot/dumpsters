import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export type ApiError = {
  name: "ApiError";
  status: number;
  message: string;
};

export const isApiError = (err: unknown): err is ApiError =>
  typeof err === "object" &&
  err !== null &&
  (err as ApiError).name === "ApiError";

const makeApiError = (status: number, message: string): ApiError => ({
  name: "ApiError",
  status,
  message,
});

const handleResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: res.statusText }));
    const errorMessage = body.message ?? res.statusText;
    toast(errorMessage);
    throw makeApiError(res.status, errorMessage);
  }
  return res.json();
};

export const api = {
  get: <T>(url: string): Promise<T> =>
    fetch(`${BASE_URL}${url}`).then(handleResponse<T>),

  post: <T>(url: string, body: unknown): Promise<T> =>
    fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(handleResponse<T>),

  patch: <T>(url: string, body: unknown): Promise<T> =>
    fetch(`${BASE_URL}${url}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(handleResponse<T>),

  delete: <T>(url: string): Promise<T> =>
    fetch(`${BASE_URL}${url}`, { method: "DELETE" }).then(handleResponse<T>),
};

// export const apiErrorHandler = (e: ApiError): string => {
//   switch (e.status) {
//     default:
//       return "Что то пошло не так :(";
//   }
// };
