import { API_CONFIG, API_ENDPOINTS, API_LIMITS } from '../constants/api';
import { SearchResponse } from '../types/product';
import { CategoryProductsResponse } from '../types/category';

export class AmazonApiService {
  private static async fetchApi<T>(endpoint: string, params: Record<string, string | number>): Promise<T> {
    const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: API_CONFIG.HEADERS,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  static async searchProducts(query: string, page: number = API_LIMITS.DEFAULT_PAGE): Promise<SearchResponse> {
    return this.fetchApi<SearchResponse>(API_ENDPOINTS.SEARCH, {
      query,
      page,
      country: API_CONFIG.DEFAULT_COUNTRY,
    });
  }

  static async getProductsByCategory(categoryId: string, page: number = API_LIMITS.DEFAULT_PAGE): Promise<CategoryProductsResponse> {
    return this.fetchApi<CategoryProductsResponse>(API_ENDPOINTS.PRODUCTS_BY_CATEGORY, {
      category_id: categoryId,
      page,
      country: API_CONFIG.DEFAULT_COUNTRY,
    });
  }
}
