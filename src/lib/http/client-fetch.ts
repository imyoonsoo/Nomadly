import axios from "axios";

export const clientFetch = axios.create({
  baseURL: "/api/proxy",
  withCredentials: true,
});

clientFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
