/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpAdapter } from "~/adapters/http-adapter";

export class PushService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async getNotification() {
    const response = await this.http.get<{ data: any }>(`/users/notifications`);
    console.log(response);
    if (response?.status === 200) {
      return response.data;
    }
  }

  async readAllNotification() {
    const response = await this.http.post<{ data: any }>(`/users/notifications`, null);
    console.log(response);
    if (response?.status === 200) {
      return response.data;
    }
  }
}
