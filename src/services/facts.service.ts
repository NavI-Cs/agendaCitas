import axios from 'axios';

const API_URL = 'https://api.chucknorris.io/jokes/random';

export const fetchRandomFact = async (): Promise<string> => {
  try {
    const response = await axios.get(API_URL);
    return response.data.value; // El hecho curioso está en la propiedad 'value'
  } catch (error) {
    console.error('Error fetching fact:', error);
    return 'No se pudo cargar el hecho curioso. Inténtalo de nuevo más tarde.';
  }
};