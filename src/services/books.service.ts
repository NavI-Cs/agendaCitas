// src/services/books.service.ts
import axios from 'axios';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  publishedDate: string;
  thumbnail: string;
  previewLink: string;
}

export const searchBooks = async (query: string): Promise<Book[]> => {
  if (!query) {
    return [];
  }
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_API}?q=${encodeURIComponent(query)}`);
    const items = response.data.items || [];
    return items.map((item: any) => {
      const volumeInfo = item.volumeInfo;
      return {
        id: item.id,
        title: volumeInfo.title || 'Título no disponible',
        authors: volumeInfo.authors || [],
        description: volumeInfo.description || 'Descripción no disponible',
        publishedDate: volumeInfo.publishedDate || 'Fecha no disponible',
        thumbnail: volumeInfo.imageLinks?.thumbnail || '',
        previewLink: volumeInfo.previewLink || '',
      };
    });
  } catch (error) {
    console.error('Error searching books:', error);
    return [];
  }
};

export const getBookDetails = async (bookId: string): Promise<Book | null> => {
  if (!bookId) {
    return null;
  }
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_API}/${bookId}`);
    const item = response.data;
    const volumeInfo = item.volumeInfo;
    return {
      id: item.id,
      title: volumeInfo.title || 'Título no disponible',
      authors: volumeInfo.authors || [],
      description: volumeInfo.description || 'Descripción no disponible',
      publishedDate: volumeInfo.publishedDate || 'Fecha no disponible',
      thumbnail: volumeInfo.imageLinks?.thumbnail || '',
      previewLink: volumeInfo.previewLink || '',
    };
  } catch (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
};
