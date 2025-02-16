import { HttpAdapter } from "~/adapters/http-adapter";
import { ContactFormData } from "~/schemas";

export class HelpService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async getFAQ() {
    const response = await this.http.get<{ data: IFAQ }>(`/faqs`);
    if (response?.status === 200) {
      return response.data;
    }
  }

  async contactUs(data: ContactFormData) {
    const response = await this.http.post<{ message: string }>(`/complaints`, data);
    if (response?.status === 201) {
      return response.data;
    }
  }
}
