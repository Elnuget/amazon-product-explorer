import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { SearchScreen } from './src/screens/SearchScreen';
import { CategoryScreen } from './src/screens/CategoryScreen';
import { ProductDetailScreen } from './src/screens/ProductDetailScreen';

type Screen = 'search' | 'categories' | 'productDetail';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('search');
  const [selectedProductAsin, setSelectedProductAsin] = useState<string | null>(null);

  const handleProductPress = (asin: string) => {
    setSelectedProductAsin(asin);
    setCurrentScreen('productDetail');
  };

  const handleBackFromDetail = () => {
    setCurrentScreen('search');
    setSelectedProductAsin(null);
  };

  if (currentScreen === 'productDetail' && selectedProductAsin) {
    return (
      <ProductDetailScreen 
        asin={selectedProductAsin} 
        onBack={handleBackFromDetail} 
      />
    );
  }

  return (
    <View style={styles.container}>
      {currentScreen === 'search' ? (
        <SearchScreen onProductPress={handleProductPress} />
      ) : (
        <CategoryScreen onProductPress={handleProductPress} />
      )}
      
      <View style={styles.tabBar}>
        <Pressable
          style={[styles.tab, currentScreen === 'search' && styles.activeTab]}
          onPress={() => setCurrentScreen('search')}
        >
          <Text style={[styles.tabText, currentScreen === 'search' && styles.activeTabText]}>
            Buscar
          </Text>
        </Pressable>
        
        <Pressable
          style={[styles.tab, currentScreen === 'categories' && styles.activeTab]}
          onPress={() => setCurrentScreen('categories')}
        >
          <Text style={[styles.tabText, currentScreen === 'categories' && styles.activeTabText]}>
            Categorías
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: '#FF9900',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FF9900',
    fontWeight: '700',
  },
});
