// src/services/favorites.service.ts
import { Preferences } from '@capacitor/preferences';
import { Book } from './books.service';

const FAVORITES_KEY = 'favoriteBooks';

export const getFavorites = async (): Promise<Book[]> => {
  const { value } = await Preferences.get({ key: FAVORITES_KEY });
  return value ? JSON.parse(value) : [];
};

export const addFavorite = async (book: Book) => {
  const favorites = await getFavorites();
  const isExisting = favorites.some((fav) => fav.id === book.id);
  if (!isExisting) {
    favorites.push(book);
    await Preferences.set({
      key: FAVORITES_KEY,
      value: JSON.stringify(favorites),
    });
  }
};

export const isBookFavorite = async (bookId: string): Promise<boolean> => {
  const favorites = await getFavorites();
  return favorites.some((book) => book.id === bookId);
};
