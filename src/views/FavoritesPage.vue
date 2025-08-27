<template>
  <!-- FavoritesPage.vue -->
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tab1"></ion-back-button>
        </ion-buttons>
        <ion-title>Mis Favoritos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div v-if="favorites.length > 0">
        <ion-list>
          <ion-item v-for="book in favorites" :key="book.id">
            <ion-thumbnail slot="start">
              <img :src="book.thumbnail || 'https://via.placeholder.com/64'" />
            </ion-thumbnail>
            <ion-label>
              <h2>{{ book.title }}</h2>
              <p>{{ book.authors?.join(', ') || 'Autor desconocido' }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
      <div v-else class="empty-state">
        <p class="ion-text-center">Todavía no tienes libros favoritos.</p>
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
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonButtons,
  IonBackButton,
} from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { getFavorites } from '@/services/favorites.service';
import { Book } from '@/services/books.service';

const favorites = ref<Book[]>([]);

onMounted(async () => {
  favorites.value = await getFavorites();
});
</script>

<style scoped>
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
