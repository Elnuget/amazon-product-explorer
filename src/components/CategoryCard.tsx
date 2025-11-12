import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Category } from '../types/category';

interface CategoryCardProps {
  category: Category;
  onPress: (category: Category) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={() => onPress(category)}
    >
      <Text style={styles.icon}>{category.icon}</Text>
      <Text style={styles.name}>{category.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: '#f0f0f0',
  },
  icon: {
    fontSize: 40,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
