<template>
  <!-- HistoryPage.vue -->
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Historial de Citas</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="handleSignOut">
            <ion-icon slot="icon-only" :icon="logOutOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-spinner v-if="isLoading" name="dots" class="ion-text-center"></ion-spinner>

      <div v-if="appointments.length > 0">
        <ion-list>
          <ion-item v-for="appointment in appointments" :key="appointment.id">
            <ion-label>
              <h2>{{ new Date(appointment.date).toLocaleString() }}</h2>
              <p>{{ appointment.reason }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
      <div v-else-if="!isLoading" class="ion-text-center empty-state">
        <p>No tienes citas agendadas.</p>
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
  IonSpinner,
  IonButtons,
  IonButton,
  IonIcon,
  useIonRouter,
} from '@ionic/vue';
import { logOutOutline } from 'ionicons/icons';
import { ref, onMounted, onUnmounted } from 'vue';
import { subscribeToAppointmentHistory } from '@/services/appointments.service';
import { Appointment } from '@/services/appointments.service';
import { auth } from '@/services/firebase';
import { signOut } from 'firebase/auth';

const router = useIonRouter();
const appointments = ref<Appointment[]>([]);
const isLoading = ref(true);
let unsubscribe: (() => void) | null = null;

const handleSignOut = async () => {
  try {
    await signOut(auth);
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

onMounted(async () => {
  const userId = auth.currentUser?.uid;
  if (userId) {
    isLoading.value = true;
    try {
      // Suscríbete al historial de citas
      unsubscribe = subscribeToAppointmentHistory(userId, (newAppointments) => {
        appointments.value = newAppointments;
        isLoading.value = false;
      });
    } catch (error) {
      console.error('Failed to subscribe to appointments:', error);
      isLoading.value = false;
    }
  } else {
    isLoading.value = false;
  }
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
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
