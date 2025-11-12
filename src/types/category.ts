import { Product } from './product';

export interface Category {
  id: string;
  name: string;
  icon: string;
  searchQuery: string;
}

export interface CategoryProductsResponse {
  status: string;
  request_id: string;
  data: {
    products: Product[];
    total_products?: number;
    country?: string;
    domain?: string;
  };
}

export interface CategoryState {
  products: Product[];
  loading: boolean;
  error: string | null;
  selectedCategory: Category | null;
}
