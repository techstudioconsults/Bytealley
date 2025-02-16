import { HttpAdapter } from "~/adapters/http-adapter";
import { ProfileFormData } from "~/schemas";

export class AppService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async getUser() {
    const response = await this.http.get<{ data: IFAQ }>(`/faqs`);
    if (response?.status === 200) {
      return response.data;
    }
  }

  async updateUser(data: ProfileFormData) {
    const headers = { "Content-Type": "multipart/form-data" };
    const response = await this.http.post<{ data: IUser }>(`/users/me`, data, headers);
    if (response?.status === 200) {
      return response.data.data;
    }
  }
}
