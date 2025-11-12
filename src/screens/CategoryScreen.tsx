import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCategory } from '../hooks/useCategory';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { CategoryCardSkeleton, ProductCardSkeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import { ErrorView } from '../components/ErrorView';
import { CATEGORIES } from '../constants/categories';
import { Category } from '../types/category';
import { Product } from '../types/product';

interface CategoryScreenProps {
  onProductPress?: (asin: string) => void;
}

export const CategoryScreen: React.FC<CategoryScreenProps> = ({ onProductPress }) => {
  const { products, loading, error, selectedCategory, fetchProductsByCategory, clearCategory } = useCategory();

  const handleCategoryPress = (category: Category) => {
    fetchProductsByCategory(category);
  };

  const handleProductPress = (product: Product) => {
    onProductPress?.(product.asin);
  };

  const handleBackPress = () => {
    clearCategory();
  };

  if (selectedCategory) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        
        <View style={styles.header}>
          <Pressable onPress={handleBackPress} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Volver</Text>
          </Pressable>
          <Text style={styles.headerTitle}>
            {selectedCategory.icon} {selectedCategory.name}
          </Text>
        </View>

        {error && (
          <ErrorView message={error} onRetry={() => selectedCategory && fetchProductsByCategory(selectedCategory)} />
        )}

        {loading && (
          <FlatList
            key="products-loading"
            data={[1, 2, 3, 4, 5]}
            keyExtractor={(item) => item.toString()}
            renderItem={() => <ProductCardSkeleton />}
            contentContainerStyle={styles.listContent}
          />
        )}

        {!loading && products.length === 0 && !error && (
          <EmptyState
            icon="📦"
            title="No hay productos"
            message="No se encontraron productos en esta categoría"
          />
        )}

        {!loading && products.length > 0 && (
          <FlatList
            key="products-list"
            data={products}
            keyExtractor={(item) => item.asin}
            renderItem={({ item }) => (
              <ProductCard product={item} onPress={handleProductPress} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categorías</Text>
      </View>

      <View style={styles.subtitle}>
        <Text style={styles.subtitleText}>Selecciona una categoría para explorar productos</Text>
      </View>

      <FlatList
        key="categories-grid"
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryCard category={item} onPress={handleCategoryPress} />
        )}
        numColumns={2}
        contentContainerStyle={styles.categoriesContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  backButton: {
    marginBottom: 8,
  },
  backButtonText: {
    color: '#FF9900',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  subtitleText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  categoriesContent: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  errorContainer: {
    backgroundColor: '#fee',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#c00',
  },
  errorText: {
    color: '#c00',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  listContent: {
    paddingVertical: 8,
  },
});
