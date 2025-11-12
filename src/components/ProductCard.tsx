import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={() => onPress?.(product)}
    >
      <Image
        source={{ uri: product.product_photo }}
        style={styles.image}
        resizeMode="contain"
      />
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.product_title}
        </Text>
        
        <View style={styles.footer}>
          {product.product_price && (
            <Text style={styles.price}>{product.product_price}</Text>
          )}
          
          {product.product_star_rating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>⭐ {product.product_star_rating}</Text>
              {product.product_num_ratings && (
                <Text style={styles.numRatings}>
                  ({product.product_num_ratings.toLocaleString()})
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    lineHeight: 18,
  },
  footer: {
    gap: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#B12704',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    color: '#555',
  },
  numRatings: {
    fontSize: 12,
    color: '#888',
  },
});
