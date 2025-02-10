import { HttpAdapter } from "~/adapters/http-adapter";

export class AnalyticsService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async getAllDownload(filters: IFilters) {
    const queryParameters = this.buildQueryParameters(filters);
    const response = await this.http.get<IPaginatedResponse<IPayout>>(`/downloads${queryParameters}`);
    if (response?.status === 200) {
      return response.data;
    }
  }

  async getDownloadById(downloadId: string) {
    const response = await this.http.get<{ data: IPayout }>(`/downloads/${downloadId}`);
    if (response?.status === 200) {
      return response.data;
    }
  }

  private buildQueryParameters(filters: IFilters): string {
    const queryParameters = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined) {
        queryParameters.append(key, value.toString());
      }
    }
    return queryParameters.toString();
  }
}
