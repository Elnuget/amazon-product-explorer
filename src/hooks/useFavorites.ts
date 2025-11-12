import { useState, useEffect, useCallback } from 'react';
import { FavoritesService } from '../services/favorites';
import { Product } from '../types/product';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const favs = await FavoritesService.getFavorites();
      setFavorites(favs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar favoritos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const addFavorite = async (product: Product): Promise<boolean> => {
    try {
      const success = await FavoritesService.addFavorite(product);
      if (success) {
        setFavorites(prev => [...prev, product]);
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al agregar favorito');
      return false;
    }
  };

  const removeFavorite = async (asin: string): Promise<boolean> => {
    try {
      const success = await FavoritesService.removeFavorite(asin);
      if (success) {
        setFavorites(prev => prev.filter(fav => fav.asin !== asin));
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar favorito');
      return false;
    }
  };

  const toggleFavorite = async (product: Product): Promise<boolean> => {
    const isFav = favorites.some(fav => fav.asin === product.asin);
    if (isFav) {
      return removeFavorite(product.asin);
    } else {
      return addFavorite(product);
    }
  };

  const isFavorite = (asin: string): boolean => {
    return favorites.some(fav => fav.asin === asin);
  };

  const clearAllFavorites = async (): Promise<boolean> => {
    try {
      const success = await FavoritesService.clearFavorites();
      if (success) {
        setFavorites([]);
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al limpiar favoritos');
      return false;
    }
  };

  return {
    favorites,
    loading,
    error,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearAllFavorites,
    refreshFavorites: loadFavorites,
  };
};
