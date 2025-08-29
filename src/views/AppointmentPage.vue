<template>
  <!-- AppointmentPage.vue -->
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Reservar Cita</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="handleSignOut">
            <ion-icon slot="icon-only" :icon="logOutOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div class="appointment-container">
        <ion-card>
          <ion-card-header>
            <ion-card-title class="ion-text-center">Nueva Cita</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <!-- Selector de fecha y hora -->
            <ion-item>
              <ion-label>Fecha y Hora</ion-label>
              <ion-datetime display-format="YYYY-MM-DD HH:mm" presentation="date-time" v-model="appointmentDate"></ion-datetime>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Motivo de la Cita</ion-label>
              <ion-textarea v-model="reason" placeholder="Describe el motivo de la cita"></ion-textarea>
            </ion-item>

            <ion-button expand="block" class="ion-margin-top" @click="reserveAppointment">
              Reservar
            </ion-button>
          </ion-card-content>
        </ion-card>

        <p v-if="successMessage" class="success-message ion-text-center">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error-message ion-text-center">{{ errorMessage }}</p>
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
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonDatetime,
  IonTextarea,
  useIonRouter,
} from '@ionic/vue';
import { logOutOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { auth } from '@/services/firebase';
import { saveAppointment } from '@/services/appointments.service';
import { signOut } from 'firebase/auth';
import { simulatePushNotification } from '@/services/notification.service';
import { notificationEvent } from '@/services/notification.service';

const router = useIonRouter();
const appointmentDate = ref<string>('');
const reason = ref<string>('');
const successMessage = ref<string>('');
const errorMessage = ref<string>('');

const handleSignOut = async () => {
  try {
    await signOut(auth);
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

const reserveAppointment = async () => {
  if (!appointmentDate.value || !reason.value) {
    errorMessage.value = 'Por favor, completa todos los campos.';
    return;
  }
  errorMessage.value = '';
  successMessage.value = '';

  const userId = auth.currentUser?.uid;
  if (!userId) {
    errorMessage.value = 'Debes iniciar sesión para reservar una cita.';
    return;
  }

  try {
    const appointmentId = await saveAppointment(
      userId,
      new Date(appointmentDate.value),
      reason.value,
    );
    successMessage.value = `Cita reservada con éxito. ID: ${appointmentId}`;

    // Simular notificación push
    simulatePushNotification(new Date(appointmentDate.value));

    // Limpiar campos
    appointmentDate.value = '';
    reason.value = '';
  } catch (error: any) {
    errorMessage.value = error.message;
  }
};
</script>

<style scoped>
.appointment-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.success-message {
  color: green;
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
