import { HttpAdapter } from "~/adapters/http-adapter";

export class PayoutService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async getAllPayouts(filters: IProductFilters) {
    const queryParameters = this.buildQueryParameters(filters);
    const response = await this.http.get<IPaginatedResponse<IPayout>>(`/payouts/user?${queryParameters}`);
    if (response?.status === 200) {
      return response.data;
    }
  }

  async getPayoutById(payoutId: string) {
    const response = await this.http.get<{ data: IPayout }>(`/payouts/${payoutId}`);
    if (response?.status === 200) {
      return response.data;
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
