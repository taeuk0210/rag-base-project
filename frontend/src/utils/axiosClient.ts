import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { tokenManager } from "./tokenManager";
import { userApi } from "@/api/userApi";

const axiosClient = axios.create({
  baseURL: "http://localhost:7700/api/v1",
  timeout: 60 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenManager.getAccessToken();
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let subscribers: ((token: string | null) => void)[] = [];

const onRefreshed = (token: string | null) => {
  subscribers.forEach((cb) => {
    try {
      cb(token);
    } catch (_) {}
  });
  subscribers = [];
};

const addSubscriber = (cb: (token: string | null) => void) => {
  subscribers.push(cb);
};

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          addSubscriber((token) => {
            if (!token) return reject(new Error("Token refresh failed"));
            originalRequest.headers.set("Authorization", `Bearer ${token}`);
            resolve(axiosClient(originalRequest));
          });
        });
      }

      isRefreshing = true;
      try {
        const { data } = await userApi.refresh();

        const newAccessToken = data?.authResponse?.accessToken as
          | string
          | undefined;
        if (!newAccessToken) {
          throw new Error("No access token in refresh response");
        }

        tokenManager.setAccessToken(newAccessToken);

        onRefreshed(newAccessToken);

        originalRequest.headers.set(
          "Authorization",
          `Bearer ${newAccessToken}`
        );
        return axiosClient(originalRequest);
      } catch (err) {
        tokenManager.clear();
        onRefreshed(null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
