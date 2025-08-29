<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="calendarOutline" />
          <ion-label>Reservar</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="timeOutline" />
          <ion-label>Historial</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="settingsOutline" />
          <ion-label>Ajustes</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>

    <!-- Componente de Toast para notificaciones -->
    <ion-toast
      :is-open="showToast"
      :message="toastMessage"
      :duration="5000"
      @didDismiss="showToast = false"
    ></ion-toast>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonToast,
} from '@ionic/vue';
import { calendarOutline, timeOutline, settingsOutline } from 'ionicons/icons';
import { ref, watch } from 'vue';
import { notificationEvent } from '@/services/notification.service';

const showToast = ref(false);
const toastMessage = ref('');

// Observa los cambios en el evento de notificación
watch(notificationEvent, (newMessage) => {
  if (newMessage) {
    toastMessage.value = newMessage;
    showToast.value = true;
    // Limpia el evento después de mostrarlo para futuras notificaciones
    notificationEvent.value = null;
  }
});
</script>
