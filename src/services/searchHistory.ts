import AsyncStorage from '@react-native-async-storage/async-storage';

const SEARCH_HISTORY_KEY = '@amazon_search_history';
const MAX_HISTORY_ITEMS = 10;

export class SearchHistoryService {
  static async getHistory(): Promise<string[]> {
    try {
      const history = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error loading search history:', error);
      return [];
    }
  }

  static async addToHistory(query: string): Promise<void> {
    if (!query.trim()) return;

    try {
      const history = await this.getHistory();
      const filteredHistory = history.filter(item => item.toLowerCase() !== query.toLowerCase());
      const newHistory = [query, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);
      
      await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  }

  static async clearHistory(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  }

  static async removeFromHistory(query: string): Promise<void> {
    try {
      const history = await this.getHistory();
      const newHistory = history.filter(item => item !== query);
      await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error removing from search history:', error);
    }
  }
}
