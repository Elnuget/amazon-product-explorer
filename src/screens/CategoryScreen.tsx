import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCategory } from '../hooks/useCategory';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../constants/categories';
import { Category } from '../types/category';
import { Product } from '../types/product';

export const CategoryScreen: React.FC = () => {
  const { products, loading, error, selectedCategory, fetchProductsByCategory, clearCategory } = useCategory();

  const handleCategoryPress = (category: Category) => {
    fetchProductsByCategory(category);
  };

  const handleProductPress = (product: Product) => {
    console.log('Product pressed:', product.asin);
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
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF9900" />
            <Text style={styles.loadingText}>Cargando productos...</Text>
          </View>
        )}

        {!loading && products.length === 0 && !error && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No se encontraron productos en esta categoría</Text>
          </View>
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
