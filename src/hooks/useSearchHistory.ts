import { useState, useEffect } from 'react';
import { SearchHistoryService } from '../services/searchHistory';

export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    setLoading(true);
    const savedHistory = await SearchHistoryService.getHistory();
    setHistory(savedHistory);
    setLoading(false);
  };

  const addToHistory = async (query: string) => {
    await SearchHistoryService.addToHistory(query);
    await loadHistory();
  };

  const removeFromHistory = async (query: string) => {
    await SearchHistoryService.removeFromHistory(query);
    await loadHistory();
  };

  const clearHistory = async () => {
    await SearchHistoryService.clearHistory();
    setHistory([]);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return {
    history,
    loading,
    addToHistory,
    removeFromHistory,
    clearHistory,
    refreshHistory: loadHistory,
  };
};
