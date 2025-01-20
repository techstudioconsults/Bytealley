import axios from "axios";

import { getSession } from "~/lib/session/session";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
const TIMEOUTMSG = "Waiting for too long...Aborted!";

const config = {
  baseURL: BASE_URL,
  timeoutErrorMessage: TIMEOUTMSG,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const http = axios.create(config);

// Add request interceptor to add auth token if it exists
http.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default http;
