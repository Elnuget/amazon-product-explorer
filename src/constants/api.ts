/**
 * API Configuration Constants
 * RapidAPI - Real Time Amazon Data
 */

export const API_CONFIG = {
  BASE_URL: 'https://real-time-amazon-data.p.rapidapi.com',
  HEADERS: {
    'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
    'x-rapidapi-key': '426867ccdbmshe9e343995572f8cp186f8bjsn1b5a9ecd9b76',
  },
  DEFAULT_COUNTRY: 'US',
} as const;

export const API_ENDPOINTS = {
  SEARCH: '/search',
  PRODUCTS_BY_CATEGORY: '/products-by-category',
  PRODUCT_DETAILS: '/product-details',
  PRODUCT_REVIEWS: '/product-reviews',
  PRODUCT_OFFERS: '/product-offers',
} as const;

export const API_LIMITS = {
  MAX_OFFERS_PER_PAGE: 100,
  DEFAULT_PAGE: 1,
} as const;
