import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useProductDetails } from '../hooks/useProductDetails';
import { ReviewCard } from '../components/ReviewCard';
import { OfferCard } from '../components/OfferCard';

interface ProductDetailScreenProps {
  asin: string;
  onBack: () => void;
}

type Tab = 'details' | 'reviews' | 'offers';

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ asin, onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>('details');
  const {
    productDetail,
    reviews,
    offers,
    loadingDetail,
    loadingReviews,
    loadingOffers,
    errorDetail,
    errorReviews,
    errorOffers,
    fetchProductDetails,
    fetchProductReviews,
    fetchProductOffers,
  } = useProductDetails();

  useEffect(() => {
    fetchProductDetails(asin);
  }, [asin]);

  useEffect(() => {
    if (activeTab === 'reviews' && reviews.length === 0) {
      fetchProductReviews(asin);
    } else if (activeTab === 'offers' && offers.length === 0) {
      fetchProductOffers(asin);
    }
  }, [activeTab]);

  const renderTabContent = () => {
    if (activeTab === 'details') {
      if (loadingDetail) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF9900" />
          </View>
        );
      }

      if (errorDetail) {
        return (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorDetail}</Text>
          </View>
        );
      }

      if (!productDetail) return null;

      return (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {productDetail.product_photo && (
            <Image
              source={{ uri: productDetail.product_photo }}
              style={styles.mainImage}
              resizeMode="contain"
            />
          )}

          <View style={styles.section}>
            <Text style={styles.title}>{productDetail.product_title}</Text>

            {productDetail.brand && (
              <Text style={styles.brand}>Marca: {productDetail.brand}</Text>
            )}

            <View style={styles.priceRow}>
              {productDetail.product_price && (
                <Text style={styles.price}>{productDetail.product_price}</Text>
              )}
              {productDetail.product_original_price && 
                productDetail.product_original_price !== productDetail.product_price && (
                <Text style={styles.originalPrice}>{productDetail.product_original_price}</Text>
              )}
            </View>

            {productDetail.product_star_rating && (
              <View style={styles.ratingRow}>
                <Text style={styles.rating}>⭐ {productDetail.product_star_rating}</Text>
                {productDetail.product_num_ratings && (
                  <Text style={styles.numRatings}>
                    ({productDetail.product_num_ratings.toLocaleString()} valoraciones)
                  </Text>
                )}
              </View>
            )}

            {productDetail.product_availability && (
              <Text style={styles.availability}>{productDetail.product_availability}</Text>
            )}

            {productDetail.is_best_seller && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Más vendido</Text>
              </View>
            )}

            {productDetail.is_amazon_choice && (
              <View style={[styles.badge, styles.choiceBadge]}>
                <Text style={styles.badgeText}>Amazon's Choice</Text>
              </View>
            )}
          </View>

          {productDetail.about_product && productDetail.about_product.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Acerca de este producto</Text>
              {productDetail.about_product.map((item, index) => (
                <Text key={index} style={styles.bulletPoint}>• {item}</Text>
              ))}
            </View>
          )}

          {productDetail.product_description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Descripción</Text>
              <Text style={styles.description}>{productDetail.product_description}</Text>
            </View>
          )}
        </ScrollView>
      );
    }

    if (activeTab === 'reviews') {
      if (loadingReviews) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF9900" />
          </View>
        );
      }

      if (errorReviews) {
        return (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorReviews}</Text>
          </View>
        );
      }

      if (reviews.length === 0) {
        return (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay reseñas disponibles</Text>
          </View>
        );
      }

      return (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.listContainer}>
            {reviews.map((review) => (
              <ReviewCard key={review.review_id} review={review} />
            ))}
          </View>
        </ScrollView>
      );
    }

    if (activeTab === 'offers') {
      if (loadingOffers) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF9900" />
          </View>
        );
      }

      if (errorOffers) {
        return (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorOffers}</Text>
          </View>
        );
      }

      if (offers.length === 0) {
        return (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay ofertas disponibles</Text>
          </View>
        );
      }

      return (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.listContainer}>
            {offers.map((offer, index) => (
              <OfferCard key={offer.offer_id || index} offer={offer} />
            ))}
          </View>
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Detalle del Producto</Text>
      </View>

      <View style={styles.tabBar}>
        <Pressable
          style={[styles.tab, activeTab === 'details' && styles.activeTab]}
          onPress={() => setActiveTab('details')}
        >
          <Text style={[styles.tabText, activeTab === 'details' && styles.activeTabText]}>
            Detalles
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
          onPress={() => setActiveTab('reviews')}
        >
          <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
            Reseñas
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === 'offers' && styles.activeTab]}
          onPress={() => setActiveTab('offers')}
        >
          <Text style={[styles.tabText, activeTab === 'offers' && styles.activeTabText]}>
            Ofertas
          </Text>
        </Pressable>
      </View>

      {renderTabContent()}
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
  backButton: {
    marginBottom: 8,
  },
  backButtonText: {
    color: '#FF9900',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#FF9900',
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
  content: {
    flex: 1,
  },
  mainImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  brand: {
    fontSize: 14,
    color: '#007185',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#B12704',
  },
  originalPrice: {
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: '#555',
  },
  numRatings: {
    fontSize: 14,
    color: '#007185',
  },
  availability: {
    fontSize: 14,
    color: '#007600',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#FF9900',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
    marginBottom: 4,
  },
  choiceBadge: {
    backgroundColor: '#232F3E',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  listContainer: {
    paddingVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: '#c00',
    fontSize: 14,
    textAlign: 'center',
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
});
