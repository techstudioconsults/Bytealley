import { HttpAdapter } from "~/adapters/http-adapter";
import { ChangePasswordFormData } from "~/schemas";

export class SettingsService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async changePassword(data: ChangePasswordFormData) {
    const response = await this.http.post(`/users/change-password`, data);
    if (response?.status === 200) {
      return response.data;
    }
  }
}
