import { HttpAdapter } from "~/adapters/http-adapter";

export class SettingsService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async getOrderById(orderId: string) {
    const response = await this.http.get<{ data: IOrder }>(`/orders/${orderId}`);
    if (response?.status === 200) {
      return response.data;
    }
  }
}
