<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Mis Favoritos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list v-if="favoriteFacts.length > 0">
        <ion-item-sliding v-for="fact in favoriteFacts" :key="fact.id">
          <ion-item lines="none">
            <ion-label class="ion-text-wrap">{{ fact.fact }}</ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="danger" @click="deleteFavorite(fact.id)">
              <ion-icon slot="icon-only" :icon="trashOutline"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
      <div v-else class="ion-padding ion-text-center">
        <p>Aún no tienes hechos favoritos.</p>
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
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  onIonViewWillEnter,
} from '@ionic/vue';
import { trashOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { getFactsByUser, deleteFact } from '@/services/firebase';
import { auth } from '@/services/firebase';

const favoriteFacts = ref<any[]>([]);

const fetchFavorites = async () => {
  if (auth.currentUser) {
    favoriteFacts.value = await getFactsByUser(auth.currentUser.uid);
  }
};

const deleteFavorite = async (factId: string) => {
  try {
    await deleteFact(factId);
    // Filtra el hecho eliminado del array local
    favoriteFacts.value = favoriteFacts.value.filter(fact => fact.id !== factId);
    console.log('Fact removed from list');
  } catch (error) {
    console.error('Failed to delete fact:', error);
  }
};

// Este hook se activa cada vez que la vista va a ser mostrada
onIonViewWillEnter(fetchFavorites);
</script>