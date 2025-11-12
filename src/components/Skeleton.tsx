import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: object;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  width = '100%', 
  height = 20, 
  borderRadius = 4,
  style 
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width, height, borderRadius, opacity },
        style,
      ]}
    />
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <View style={styles.productCardContainer}>
      <Skeleton width={100} height={100} borderRadius={4} />
      <View style={styles.productCardContent}>
        <Skeleton width="90%" height={16} style={{ marginBottom: 8 }} />
        <Skeleton width="70%" height={14} style={{ marginBottom: 8 }} />
        <Skeleton width={80} height={20} style={{ marginBottom: 8 }} />
        <Skeleton width={120} height={14} />
      </View>
    </View>
  );
};

export const CategoryCardSkeleton: React.FC = () => {
  return (
    <View style={styles.categoryCardContainer}>
      <Skeleton width={50} height={50} borderRadius={25} style={{ marginBottom: 8 }} />
      <Skeleton width={80} height={14} />
    </View>
  );
};

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <View style={styles.detailContainer}>
      <Skeleton width="100%" height={300} style={{ marginBottom: 16 }} />
      <View style={styles.detailContent}>
        <Skeleton width="100%" height={24} style={{ marginBottom: 12 }} />
        <Skeleton width="60%" height={18} style={{ marginBottom: 8 }} />
        <Skeleton width={100} height={28} style={{ marginBottom: 12 }} />
        <Skeleton width={150} height={16} style={{ marginBottom: 16 }} />
        <Skeleton width="100%" height={14} style={{ marginBottom: 6 }} />
        <Skeleton width="100%" height={14} style={{ marginBottom: 6 }} />
        <Skeleton width="80%" height={14} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#E1E9EE',
  },
  productCardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  productCardContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  categoryCardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    flex: 1,
  },
  detailContainer: {
    flex: 1,
  },
  detailContent: {
    padding: 16,
    backgroundColor: '#fff',
  },
});
