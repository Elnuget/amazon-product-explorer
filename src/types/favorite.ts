import { Product } from './product';

export interface Favorite {
  product: Product;
  addedAt: number;
}

export interface FavoritesState {
  favorites: Product[];
  loading: boolean;
  error: string | null;
}
