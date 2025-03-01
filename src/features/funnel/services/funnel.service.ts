import { HttpAdapter } from "~/adapters/http-adapter";
import { ChangePasswordFormData, KycFormData } from "~/schemas";

export class FunnelService {
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

  async submitKYCDocument(data: KycFormData) {
    const headers = { "Content-Type": "multipart/form-data" };
    const response = await this.http.post(`/users/kyc`, data, headers);
    if (response?.status === 200) {
      return response.data;
    }
  }

  async getSubscriptionBillingCycle() {
    const response = await this.http.get<IBillingCycle>(`/subscriptions/billing`);
    if (response?.status === 200) {
      return response.data;
    }
  }

  async manageSubscriptionPlan(billingID: string) {
    const response = await this.http.get<{ data: ISubscriptionPlan }>(`/subscriptions/${billingID}/manage`);
    if (response?.status === 200) {
      return response.data;
    }
  }

  async changeAccountStatus(data: object, accountID: string) {
    const response = await this.http.patch<{ data: IPaymentAccount[] }>(`/accounts/${accountID}`, data);
    if (response?.status === 200) {
      return response.data;
    }
  }
}
