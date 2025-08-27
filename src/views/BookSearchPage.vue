<template>
  <!-- BookSearchPage.vue -->
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Búsqueda de Libros</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="goToFavorites">
            <ion-icon :icon="heart"></ion-icon>
          </ion-button>
          <ion-button @click="handleSignOut">
            <ion-icon slot="icon-only" :icon="logOutOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-searchbar v-model="searchTerm" placeholder="Busca un libro"></ion-searchbar>
      <ion-button expand="block" @click="searchBooks">Buscar</ion-button>

      <ion-spinner v-if="isLoading" name="crescent" class="ion-text-center"></ion-spinner>

      <ion-list v-if="books.length > 0">
        <ion-item button v-for="book in books" :key="book.id" @click="goToDetails(book.id)">
          <ion-thumbnail slot="start">
            <img :src="book.thumbnail || 'https://via.placeholder.com/64'" />
          </ion-thumbnail>
          <ion-label>
            <h2>{{ book.title }}</h2>
            <p>{{ book.authors?.join(', ') || 'Autor desconocido' }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// Importaciones de Ionic y Vue
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonSpinner,
  IonButtons,
  IonIcon,
  useIonRouter,
} from '@ionic/vue';
import { logOutOutline, heart } from 'ionicons/icons';
import { ref } from 'vue';
import { signOut } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { searchBooks as apiSearchBooks } from '@/services/books.service';

const router = useIonRouter();
const searchTerm = ref('');
const books = ref<any[]>([]);
const isLoading = ref(false);

const searchBooks = async () => {
  isLoading.value = true;
  try {
    books.value = await apiSearchBooks(searchTerm.value);
  } catch (error) {
    console.error('Error searching books:', error);
    // Manejo de errores
  } finally {
    isLoading.value = false;
  }
};

const goToDetails = (bookId: string) => {
  // Navega a la página de detalles con el ID del libro en la URL
  router.push({
    name: 'book-details',
    params: { id: bookId },
  });
};

const goToFavorites = () => {
  router.push('/favorites');
};

const handleSignOut = async () => {
  try {
    await signOut(auth);
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>

<style scoped>
ion-searchbar {
  --background: #f4f5f8;
  --border-radius: 10px;
}

ion-button {
  margin-top: 10px;
  --border-radius: 10px;
}

ion-spinner {
  display: block;
  margin-top: 20px;
  text-align: center;
}

ion-thumbnail {
  --size: 64px;
  --border-radius: 5px;
}
</style>
