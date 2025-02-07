import { HttpAdapter } from "~/adapters/http-adapter";

export class EarningService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async getUserEarnings() {
    const response = await this.http.get<{ data: IEarnings }>(`/earnings`);
    if (response?.status === 200) {
      return response.data.data;
    }
  }

  async initiateWithdrawal(orderId: string) {
    const response = await this.http.get<{ data: IOrderDetails }>(`/orders/${orderId}`);
    if (response?.status === 200) {
      return response.data.data;
    }
  }

  private buildQueryParameters(filters: IProductFilters): string {
    const queryParameters = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined) {
        queryParameters.append(key, value.toString());
      }
    }
    return queryParameters.toString();
  }
}
