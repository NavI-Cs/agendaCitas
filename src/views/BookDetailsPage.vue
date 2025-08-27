<template>
  <!-- BookDetailsPage.vue -->
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tab1"></ion-back-button>
        </ion-buttons>
        <ion-title>Detalles del Libro</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div v-if="book" class="details-container">
        <div class="thumbnail-container">
          <img :src="book.thumbnail || 'https://via.placeholder.com/128'" alt="Portada del libro" />
        </div>
        <h1 class="ion-text-center">{{ book.title }}</h1>
        <h3 class="ion-text-center">por {{ book.authors?.join(', ') || 'Autor desconocido' }}</h3>

        <ion-card>
          <ion-card-header>
            <ion-card-title>Descripción</ion-card-title>
          </ion-card-header>
          <ion-card-content>{{ book.description || 'Sin descripción.' }}</ion-card-content>
        </ion-card>

        <ion-item>
          <ion-label>Fecha de Publicación</ion-label>
          <ion-note slot="end">{{ book.publishedDate }}</ion-note>
        </ion-item>

        <ion-button expand="block" @click="addToFavorites" :disabled="isFavorite">
          <ion-icon slot="start" :icon="heart"></ion-icon>
          {{ isFavorite ? 'En Favoritos' : 'Añadir a Favoritos' }}
        </ion-button>
      </div>
      <div v-else class="ion-text-center ion-margin-top">
        <p>Cargando detalles del libro...</p>
        <ion-spinner name="crescent"></ion-spinner>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonNote,
  IonSpinner,
} from '@ionic/vue';
import { heart } from 'ionicons/icons';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getBookDetails } from '@/services/books.service';
import { addFavorite, isBookFavorite } from '@/services/favorites.service';
import { Book } from '@/services/books.service';

const route = useRoute();
const book = ref<Book | null>(null);
const isFavorite = ref(false);

const checkFavoriteStatus = async () => {
  if (book.value) {
    isFavorite.value = await isBookFavorite(book.value.id);
  }
};

const fetchBookDetails = async () => {
  const bookId = route.params.id as string;
  if (bookId) {
    book.value = await getBookDetails(bookId);
    checkFavoriteStatus();
  }
};

onMounted(() => {
  fetchBookDetails();
});

const addToFavorites = async () => {
  if (book.value) {
    await addFavorite(book.value);
    isFavorite.value = true;
  }
};
</script>

<style scoped>
.details-container {
  max-width: 600px;
  margin: auto;
  padding: 10px;
  text-align: center;
}
.thumbnail-container {
  margin-bottom: 20px;
}
</style>
