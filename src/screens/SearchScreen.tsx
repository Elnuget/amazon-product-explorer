import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSearch } from '../hooks/useSearch';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { ProductCard } from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import { ErrorView } from '../components/ErrorView';
import { Product } from '../types/product';

interface SearchScreenProps {
  onProductPress?: (asin: string) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ onProductPress }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const { products, loading, error, searchProducts } = useSearch();
  const { history, addToHistory, removeFromHistory, clearHistory } = useSearchHistory();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setShowHistory(false);
    await addToHistory(searchQuery);
    searchProducts(searchQuery);
  };

  const handleHistoryItemPress = (query: string) => {
    setSearchQuery(query);
    setShowHistory(false);
    searchProducts(query);
  };

  const handleProductPress = (product: Product) => {
    onProductPress?.(product.asin);
  };

  const handleInputFocus = () => {
    if (history.length > 0 && !products.length && !loading) {
      setShowHistory(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Amazon Product Explorer</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar productos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          onFocus={handleInputFocus}
          returnKeyType="search"
          editable={!loading}
        />
        
        <Pressable
          style={({ pressed }) => [
            styles.searchButton,
            pressed && styles.searchButtonPressed,
            loading && styles.searchButtonDisabled,
          ]}
          onPress={handleSearch}
          disabled={loading}
        >
          <Text style={styles.searchButtonText}>
            {loading ? 'Buscando...' : 'Buscar'}
          </Text>
        </Pressable>
      </View>

      {showHistory && history.length > 0 && (
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Búsquedas recientes</Text>
            <Pressable onPress={clearHistory}>
              <Text style={styles.clearText}>Limpiar</Text>
            </Pressable>
          </View>
          <ScrollView style={styles.historyList}>
            {history.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <Pressable 
                  style={styles.historyItemButton}
                  onPress={() => handleHistoryItemPress(item)}
                >
                  <Text style={styles.historyIcon}>🕐</Text>
                  <Text style={styles.historyText}>{item}</Text>
                </Pressable>
                <Pressable onPress={() => removeFromHistory(item)}>
                  <Text style={styles.removeIcon}>✕</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {error && (
        <ErrorView message={error} onRetry={() => searchProducts(searchQuery)} />
      )}

      {loading && (
        <FlatList
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(item) => item.toString()}
          renderItem={() => <ProductCardSkeleton />}
          contentContainerStyle={styles.listContent}
        />
      )}

      {!loading && products.length === 0 && !error && !showHistory && (
        <EmptyState
          icon="🔍"
          title="Busca productos de Amazon"
          message="Ingresa un término para comenzar a explorar miles de productos"
        />
      )}

      {!loading && products.length > 0 && (
        <FlatList
          data={products}
          keyExtractor={(item) => item.asin}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={handleProductPress} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#232F3E',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: '#FF9900',
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
  },
  searchButtonPressed: {
    opacity: 0.8,
  },
  searchButtonDisabled: {
    backgroundColor: '#ccc',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  historyContainer: {
    backgroundColor: '#fff',
    maxHeight: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  clearText: {
    fontSize: 14,
    color: '#FF9900',
    fontWeight: '600',
  },
  historyList: {
    maxHeight: 250,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  historyItemButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyIcon: {
    fontSize: 18,
  },
  historyText: {
    fontSize: 14,
    color: '#333',
  },
  removeIcon: {
    fontSize: 18,
    color: '#999',
    padding: 4,
  },
  listContent: {
    paddingVertical: 8,
  },
});
