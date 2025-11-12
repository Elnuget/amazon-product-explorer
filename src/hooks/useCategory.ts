import { useState } from 'react';
import { AmazonApiService } from '../services/amazonApi';
import { Product } from '../types/product';
import { Category } from '../types/category';

export const useCategory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const fetchProductsByCategory = async (category: Category, page: number = 1) => {
    setLoading(true);
    setError(null);
    setSelectedCategory(category);

    try {
      const response = await AmazonApiService.searchProducts(category.searchQuery, page);
      setProducts(response.data.products || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar productos');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const clearCategory = () => {
    setProducts([]);
    setError(null);
    setSelectedCategory(null);
  };

  return {
    products,
    loading,
    error,
    selectedCategory,
    fetchProductsByCategory,
    clearCategory,
  };
};
