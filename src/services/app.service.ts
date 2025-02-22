import { HttpAdapter } from "~/adapters/http-adapter";
import { EmailIntegrationFormData, ProfileFormData } from "~/schemas";

export class AppService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async getCurrentUser() {
    const response = await this.http.get<{ data: IUser }>("/users/me");
    if (response?.status === 200) {
      return response.data.data;
    }
  }

  async updateUser(data: ProfileFormData) {
    const headers = { "Content-Type": "multipart/form-data" };
    const response = await this.http.post<{ data: IUser }>(`/users/me`, data, headers);
    if (response?.status === 200) {
      return response.data.data;
    }
  }

  async subscribeToPlan() {
    const response = await this.http.post<{ data: ISubscriptionPlan }>(`/subscriptions`, null);
    if (response?.status === 200) {
      return response.data.data;
    }
  }

  async integrateEmail(data: EmailIntegrationFormData) {
    const response = await this.http.post<{ data: { message: string } }>(`/emailMarketing/token`, data);
    if (response?.status === 200) {
      return response.data.data;
    }
  }

  async updateUserNotifications(data: object) {
    const response = await this.http.post<{ data: IUser }>(`/users/me`, data);
    if (response?.status === 200) {
      return response.data.data;
    }
  }
}
