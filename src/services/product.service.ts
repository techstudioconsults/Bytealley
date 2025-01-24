import { HttpAdapter } from "~/adapters/http-adapter";

export class ProductService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async getAllProducts(filters: IProductFilters = Object.create({ page: 1 })) {
    const queryParameters = new URLSearchParams();

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined) {
        queryParameters.append(key, value.toString());
      }
    }

    const response = await this.http.get<IPaginatedResponse<IProduct>>(`/products/users?${queryParameters.toString()}`);
    if (response?.status === 200) {
      return response.data;
    }
  }

  async getDashboardAnalytics() {
    const response = await this.http.get<{ data: IDashboardAnalytics }>("/products/analytics");
    if (response?.status === 200) {
      return response.data;
    }
  }
}
