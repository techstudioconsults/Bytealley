import { HttpAdapter } from "~/adapters/http-adapter";

export class ProductService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async getAllProducts(filters: IProductFilters = Object.create({ page: 1 })) {
    const queryParameters = this.buildQueryParameters(filters);
    const response = await this.http.get<IPaginatedResponse<IProduct>>(`/products/users?${queryParameters}`);
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

  async downloadProducts(filters: IProductFilters = Object.create({ page: 1 })) {
    const queryParameters = this.buildQueryParameters(filters);
    const response = await this.http.get(`/products/download?${queryParameters}`);
    if (response?.status === 200) {
      // console.log(response.data);
      // return response.data; // This will be a Blob for the CSV file
    }
  }

  async softDeleteProduct(productId: string) {
    const response = await this.http.delete<IProduct>(`/products/${productId}`);
    if (response?.status === 200) {
      return response.data;
    }
  }

  async getProductById(productId: string) {
    const response = await this.http.get<{ data: IProduct }>(`/products/${productId}`);
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
