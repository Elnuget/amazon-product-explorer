import { Category } from '../types/category';

export const CATEGORIES: Category[] = [
  { id: 'electronics', name: 'Electrónica', icon: '📱', searchQuery: 'laptop phone tablet' },
  { id: 'books', name: 'Libros', icon: '📚', searchQuery: 'book kindle paperback' },
  { id: 'clothing', name: 'Ropa', icon: '👕', searchQuery: 'shirt pants dress shoes' },
  { id: 'home', name: 'Hogar', icon: '🏠', searchQuery: 'kitchen furniture home decor' },
  { id: 'beauty', name: 'Belleza', icon: '💄', searchQuery: 'makeup skincare cosmetics' },
  { id: 'toys', name: 'Juguetes', icon: '🎮', searchQuery: 'toy game puzzle lego' },
];
