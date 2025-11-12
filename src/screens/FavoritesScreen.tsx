import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFavorites } from '../hooks/useFavorites';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';
import { ErrorView } from '../components/ErrorView';
import { Product } from '../types/product';

interface FavoritesScreenProps {
  onProductPress?: (asin: string) => void;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ onProductPress }) => {
  const { favorites, loading, error, toggleFavorite, isFavorite, clearAllFavorites, refreshFavorites } = useFavorites();

  const handleProductPress = (product: Product) => {
    onProductPress?.(product.asin);
  };

  const handleToggleFavorite = async (product: Product) => {
    await toggleFavorite(product);
  };

  const handleClearAll = () => {
    clearAllFavorites();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favoritos</Text>
        {favorites.length > 0 && (
          <Pressable onPress={handleClearAll} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Limpiar todo</Text>
          </Pressable>
        )}
      </View>

      {error && (
        <ErrorView message={error} onRetry={refreshFavorites} />
      )}

      {!loading && favorites.length === 0 && !error && (
        <EmptyState
          icon="💝"
          title="Sin favoritos"
          message="Agrega productos a tus favoritos tocando el corazón"
        />
      )}

      {favorites.length > 0 && (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.asin}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={handleProductPress}
              isFavorite={isFavorite(item.asin)}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  clearButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#FF9900',
    borderRadius: 6,
  },
  clearButtonText: {
    color: '#232F3E',
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    paddingVertical: 8,
  },
});
