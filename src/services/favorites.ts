import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../types/product';

const FAVORITES_KEY = '@amazon_explorer_favorites';

export class FavoritesService {
  static async getFavorites(): Promise<Product[]> {
    try {
      const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
      if (!favoritesJson) return [];
      return JSON.parse(favoritesJson);
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  }

  static async addFavorite(product: Product): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      const exists = favorites.some(fav => fav.asin === product.asin);
      
      if (exists) return false;
      
      const updated = [...favorites, product];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Error adding favorite:', error);
      return false;
    }
  }

  static async removeFavorite(asin: string): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      const filtered = favorites.filter(fav => fav.asin !== asin);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error removing favorite:', error);
      return false;
    }
  }

  static async isFavorite(asin: string): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.some(fav => fav.asin === asin);
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  }

  static async clearFavorites(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(FAVORITES_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing favorites:', error);
      return false;
    }
  }
}
