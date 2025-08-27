import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
  orderBy
} from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);

// Función para guardar un "fact"
export const saveFact = async (uid: string, fact: string) => {
  try {
    const docRef = await addDoc(collection(db, 'favorites'), {
      userId: uid,
      fact: fact,
      createdAt: serverTimestamp(),
    });
    console.log('Fact saved with ID:', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error saving fact:', e);
    throw e;
  }
};

// Función para obtener los "facts" de un usuario
export const getFactsByUser = async (uid: string) => {
  try {
    const q = query(
      collection(db, 'favorites'),
      where('userId', '==', uid),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const favorites: any[] = [];
    querySnapshot.forEach((doc) => {
      favorites.push({ id: doc.id, ...doc.data() });
    });
    return favorites;
  } catch (e) {
    console.error('Error getting facts:', e);
    throw e;
  }
};

// Función para eliminar un "fact"
export const deleteFact = async (factId: string) => {
  try {
    await deleteDoc(doc(db, 'favorites', factId));
    console.log('Fact deleted successfully');
  } catch (e) {
    console.error('Error deleting fact:', e);
    throw e;
  }
};
