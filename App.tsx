import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { SearchScreen } from './src/screens/SearchScreen';
import { CategoryScreen } from './src/screens/CategoryScreen';
import { ProductDetailScreen } from './src/screens/ProductDetailScreen';
import { FavoritesScreen } from './src/screens/FavoritesScreen';

type Screen = 'search' | 'categories' | 'favorites' | 'productDetail';

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
      {currentScreen === 'search' && (
        <SearchScreen onProductPress={handleProductPress} />
      )}
      {currentScreen === 'categories' && (
        <CategoryScreen onProductPress={handleProductPress} />
      )}
      {currentScreen === 'favorites' && (
        <FavoritesScreen onProductPress={handleProductPress} />
      )}
      
      <View style={styles.tabBar}>
        <Pressable
          style={({ pressed }) => [
            styles.tab,
            currentScreen === 'search' && styles.activeTab,
            pressed && styles.tabPressed
          ]}
          onPress={() => setCurrentScreen('search')}
        >
          <View style={styles.tabContent}>
            <Text style={[
              styles.tabIcon,
              currentScreen === 'search' && styles.activeTabIcon
            ]}>
              🔍
            </Text>
            <Text style={[
              styles.tabText,
              currentScreen === 'search' && styles.activeTabText
            ]}>
              Buscar
            </Text>
          </View>
          {currentScreen === 'search' && <View style={styles.activeIndicator} />}
        </Pressable>
        
        <Pressable
          style={({ pressed }) => [
            styles.tab,
            currentScreen === 'categories' && styles.activeTab,
            pressed && styles.tabPressed
          ]}
          onPress={() => setCurrentScreen('categories')}
        >
          <View style={styles.tabContent}>
            <Text style={[
              styles.tabIcon,
              currentScreen === 'categories' && styles.activeTabIcon
            ]}>
              📦
            </Text>
            <Text style={[
              styles.tabText,
              currentScreen === 'categories' && styles.activeTabText
            ]}>
              Categorías
            </Text>
          </View>
          {currentScreen === 'categories' && <View style={styles.activeIndicator} />}
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.tab,
            currentScreen === 'favorites' && styles.activeTab,
            pressed && styles.tabPressed
          ]}
          onPress={() => setCurrentScreen('favorites')}
        >
          <View style={styles.tabContent}>
            <Text style={[
              styles.tabIcon,
              currentScreen === 'favorites' && styles.activeTabIcon
            ]}>
              ❤️
            </Text>
            <Text style={[
              styles.tabText,
              currentScreen === 'favorites' && styles.activeTabText
            ]}>
              Favoritos
            </Text>
          </View>
          {currentScreen === 'favorites' && <View style={styles.activeIndicator} />}
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
    borderTopColor: '#e0e0e0',
    paddingBottom: 20,
    paddingTop: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeTab: {
    backgroundColor: '#FFF9F0',
  },
  tabPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.95 }],
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabIcon: {
    fontSize: 22,
    opacity: 0.6,
  },
  activeTabIcon: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
  tabText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginTop: 2,
  },
  activeTabText: {
    color: '#FF9900',
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: '20%',
    right: '20%',
    height: 3,
    backgroundColor: '#FF9900',
    borderRadius: 2,
  },
});
