/* eslint-disable unicorn/no-array-for-each */
import { HttpAdapter } from "~/adapters/http-adapter";
import { FunnelFormData } from "~/schemas";

export class FunnelService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async saveFunnelToDraft(data: FunnelFormData & { funnel: string }) {
    const headers = { "Content-Type": "multipart/form-data" };
    const formattedData = new FormData();

    formattedData.append("title", data.title);
    formattedData.append("thumbnail", data.thumbnail);
    formattedData.append("status", "draft");
    formattedData.append("template", JSON.stringify(data.funnel));
    formattedData.append("asset", data.assets[0]);
    data.products.forEach((productId, index) => {
      formattedData.append(`products[${index}]`, productId);
    });

    const response = await this.http.post("/funnels", formattedData, headers);
    if (response?.status === 201) {
      return response.data;
    }
  }

  async publishFunnel(data: FunnelFormData & { funnel: string }) {
    const headers = { "Content-Type": "multipart/form-data" };
    const formattedData = new FormData();

    formattedData.append("title", data.title);
    formattedData.append("thumbnail", data.thumbnail);
    formattedData.append("status", "published");
    formattedData.append("template", JSON.stringify(data.funnel));
    formattedData.append("asset", data.assets[0]);
    data.products.forEach((productId, index) => {
      formattedData.append(`products[${index}]`, productId);
    });

    const response = await this.http.post("/funnels", formattedData, headers);
    if (response?.status === 201) {
      return response.data;
    }
  }
}
