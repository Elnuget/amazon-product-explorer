export interface ProductDetail {
  asin: string;
  product_title: string;
  product_price?: string;
  product_original_price?: string;
  product_star_rating?: string;
  product_num_ratings?: number;
  product_url?: string;
  product_photo?: string;
  product_photos?: string[];
  product_availability?: string;
  product_description?: string;
  product_information?: Record<string, string>;
  brand?: string;
  is_best_seller?: boolean;
  is_amazon_choice?: boolean;
  sales_volume?: string;
  about_product?: string[];
  category?: string;
}

export interface Review {
  review_id: string;
  review_title: string;
  review_comment: string;
  review_star_rating: string;
  review_author: string;
  review_date: string;
  is_verified_purchase?: boolean;
  helpful_vote_count?: number;
}

export interface Offer {
  offer_id?: string;
  offer_price: string;
  offer_condition?: string;
  offer_shipping?: string;
  seller_name?: string;
  seller_rating?: string;
  is_prime?: boolean;
}

export interface ProductDetailResponse {
  status: string;
  request_id: string;
  data: ProductDetail;
}

export interface ProductReviewsResponse {
  status: string;
  request_id: string;
  data: {
    reviews: Review[];
    total_reviews?: number;
  };
}

export interface ProductOffersResponse {
  status: string;
  request_id: string;
  data: {
    offers: Offer[];
    total_offers?: number;
  };
}
