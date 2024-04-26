import { swal } from "@base/components/common/swal/SwalAlert";
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// error type is a type that we defined in our backend and its structure is like this:
// AxiosError<{ error?: string, message?: string[] }>
export type BackendErrorTemplate = AxiosError<{
  statusCode?: number;
  message?: string;
}>;

const I18N_CONFIG_KEY = import.meta.env.VITE_I18N_CONFIG_KEY || "i18n";

const AUTH_LOCAL_STORAGE_KEY =
  import.meta.env.VITE_AUTH_LOCAL_STORAGE_KEY || "accessToken";
const api = axios.create();

api.interceptors.request.use((request: InternalAxiosRequestConfig) => {
  const accessToken =
    localStorage.getItem(AUTH_LOCAL_STORAGE_KEY) ??
    sessionStorage.getItem(AUTH_LOCAL_STORAGE_KEY) ??
    "";
  if (accessToken) {
    if (!request.headers) {
      request.headers = {} as any;
    }
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  let { selectedLang }: any = JSON.parse(
    localStorage.getItem(I18N_CONFIG_KEY) ?? "{}"
  );

  if (selectedLang) {
    if (!request.headers) {
      request.headers = {} as any;
    }
    request.headers["Accept-Language"] = selectedLang;
  } else {
    request.headers["Accept-Language"] = navigator.language.split("-")[0];
  }

  return request;
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Client Errors
      if (error.response.status >= 400 && error.response.status < 500) {
        if (error.response.status === 401) {
          let backendError = error as BackendErrorTemplate;
          localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
          sessionStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
          swal
            .fire({
              title: "Error",
              text:
                backendError.response?.data.message || "Something went wrong",
              icon: "error",
            })
            .then(() => {
              window.location.href = "/auth";
            });
        } else {
          let backendError = error as BackendErrorTemplate;
          swal.fire({
            title: "Error",
            text: backendError.response?.data.message || "Something went wrong",
            icon: "error",
          });
        }
      }
      // Server Errors
      if (error.response.status >= 500) {
        console.error(error);
        if (error.response.status === 500) {
          swal.fire({
            title: "Internal Server Error",
            text: "Please try again later",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      }

      return Promise.reject(error);
    }
  }
);

export default api;
