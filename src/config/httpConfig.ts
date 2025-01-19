import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const TIMEOUTMSG = "Waiting for too long...Aborted!";

const config = {
  baseURL: BASE_URL,
  timeoutErrorMessage: TIMEOUTMSG,
  withCredentials: true,
};

const http = axios.create(config);

export default http;
