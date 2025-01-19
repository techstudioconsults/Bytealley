import http from "~/config/httpConfig";
import tryCatchWrapper from "~/utils/tryCatchFunction";

// import tryCatchWrapper from "~/utils/tryCatchFunction";

type QueryParameters = Record<string, string | number | boolean>;

export class HttpAdapter {
  private buildQueryString(query: QueryParameters): string {
    return Object.entries(query)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join("&");
  }

  async get<T>(endpoint: string, query: QueryParameters = {}): Promise<T> {
    const queryString = this.buildQueryString(query);
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    const response = await http.get(url);
    return response.data;
  }

  async post<T>(url: string, data: T) {
    return tryCatchWrapper(async () => {
      const response = await http.post(url, data);
      return { ...response.data, status: response.status };
    });
  }

  async patch<T>(url: string, data: T) {
    const response = await http.patch(url, data);
    return response.data;
  }

  async delete<T>(url: string, data?: T) {
    const response = await http.delete(url, {
      data, // Axios supports sending a request body with DELETE.
    });
    return response.data;
  }
}
