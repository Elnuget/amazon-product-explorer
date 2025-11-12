import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Review } from '../types/productDetail';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (rating: string) => {
    const stars = parseFloat(rating) || 0;
    return '⭐'.repeat(Math.round(stars));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.rating}>{renderStars(review.review_star_rating)}</Text>
        <Text style={styles.author}>{review.review_author}</Text>
      </View>
      
      {review.review_title && (
        <Text style={styles.title}>{review.review_title}</Text>
      )}
      
      <Text style={styles.comment} numberOfLines={4}>
        {review.review_comment}
      </Text>
      
      <View style={styles.footer}>
        <Text style={styles.date}>{review.review_date}</Text>
        {review.is_verified_purchase && (
          <Text style={styles.verified}>✓ Compra verificada</Text>
        )}
      </View>
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
    marginBottom: 8,
    gap: 8,
  },
  rating: {
    fontSize: 14,
  },
  author: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  comment: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  verified: {
    fontSize: 12,
    color: '#007600',
    fontWeight: '500',
  },
});
