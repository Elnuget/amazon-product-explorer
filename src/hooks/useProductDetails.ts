import { useState } from 'react';
import { AmazonApiService } from '../services/amazonApi';
import { ProductDetail, Review, Offer } from '../types/productDetail';

export const useProductDetails = () => {
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [loadingOffers, setLoadingOffers] = useState(false);
  
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const [errorReviews, setErrorReviews] = useState<string | null>(null);
  const [errorOffers, setErrorOffers] = useState<string | null>(null);

  const fetchProductDetails = async (asin: string) => {
    setLoadingDetail(true);
    setErrorDetail(null);

    try {
      const response = await AmazonApiService.getProductDetails(asin);
      setProductDetail(response.data);
    } catch (err) {
      setErrorDetail(err instanceof Error ? err.message : 'Error al cargar detalles');
      setProductDetail(null);
    } finally {
      setLoadingDetail(false);
    }
  };

  const fetchProductReviews = async (asin: string, page: number = 1) => {
    setLoadingReviews(true);
    setErrorReviews(null);

    try {
      const response = await AmazonApiService.getProductReviews(asin, page);
      setReviews(response.data.reviews || []);
    } catch (err) {
      setErrorReviews(err instanceof Error ? err.message : 'Error al cargar reseñas');
      setReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  };

  const fetchProductOffers = async (asin: string, page: number = 1) => {
    setLoadingOffers(true);
    setErrorOffers(null);

    try {
      const response = await AmazonApiService.getProductOffers(asin, page);
      setOffers(response.data.offers || []);
    } catch (err) {
      setErrorOffers(err instanceof Error ? err.message : 'Error al cargar ofertas');
      setOffers([]);
    } finally {
      setLoadingOffers(false);
    }
  };

  const clearDetails = () => {
    setProductDetail(null);
    setReviews([]);
    setOffers([]);
    setErrorDetail(null);
    setErrorReviews(null);
    setErrorOffers(null);
  };

  return {
    productDetail,
    reviews,
    offers,
    loadingDetail,
    loadingReviews,
    loadingOffers,
    errorDetail,
    errorReviews,
    errorOffers,
    fetchProductDetails,
    fetchProductReviews,
    fetchProductOffers,
    clearDetails,
  };
};
