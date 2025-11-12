import { useState } from 'react';
import { AmazonApiService } from '../services/amazonApi';
import { Product } from '../types/product';

export const useSearch = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      setError('Por favor ingresa un término de búsqueda');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await AmazonApiService.searchProducts(query);
      setProducts(response.data.products || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar productos');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setProducts([]);
    setError(null);
  };

  return {
    products,
    loading,
    error,
    searchProducts,
    clearSearch,
  };
};
