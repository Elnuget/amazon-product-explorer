export interface Product {
  asin: string;
  product_title: string;
  product_price?: string;
  product_original_price?: string;
  product_star_rating?: string;
  product_num_ratings?: number;
  product_url?: string;
  product_photo?: string;
  product_availability?: string;
  is_best_seller?: boolean;
  is_amazon_choice?: boolean;
  sales_volume?: string;
}

export interface SearchResponse {
  status: string;
  request_id: string;
  data: {
    products: Product[];
    total_products?: number;
    country?: string;
    domain?: string;
  };
}

export interface SearchState {
  products: Product[];
  loading: boolean;
  error: string | null;
}
