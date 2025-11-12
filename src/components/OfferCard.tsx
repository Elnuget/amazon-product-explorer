import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Offer } from '../types/productDetail';

interface OfferCardProps {
  offer: Offer;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.price}>{offer.offer_price}</Text>
        {offer.is_prime && (
          <View style={styles.primeBadge}>
            <Text style={styles.primeText}>Prime</Text>
          </View>
        )}
      </View>
      
      {offer.seller_name && (
        <Text style={styles.seller}>Vendedor: {offer.seller_name}</Text>
      )}
      
      <View style={styles.details}>
        {offer.offer_condition && (
          <Text style={styles.condition}>Condición: {offer.offer_condition}</Text>
        )}
        {offer.offer_shipping && (
          <Text style={styles.shipping}>Envío: {offer.offer_shipping}</Text>
        )}
      </View>
      
      {offer.seller_rating && (
        <Text style={styles.rating}>⭐ {offer.seller_rating}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#B12704',
  },
  primeBadge: {
    backgroundColor: '#00A8E1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  primeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  seller: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  details: {
    gap: 4,
    marginBottom: 6,
  },
  condition: {
    fontSize: 13,
    color: '#555',
  },
  shipping: {
    fontSize: 13,
    color: '#555',
  },
  rating: {
    fontSize: 13,
    color: '#666',
  },
});
