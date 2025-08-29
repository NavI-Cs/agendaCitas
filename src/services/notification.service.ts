// src/services/notification.service.ts

import { ref } from 'vue';

// ref para emitir eventos de notificación
export const notificationEvent = ref<string | null>(null);

/**
 * Simula el envío de una notificación push 15 minutos antes de la cita.
 * Nota: En una aplicación real, esto se manejaría en un servidor backend con FCM.
 * @param appointmentDate La fecha y hora de la cita.
 */
export const simulatePushNotification = (appointmentDate: Date) => {
  const now = new Date();
  const fifteenMinutesBefore = new Date(appointmentDate.getTime() - 15 * 60 * 1000);

  // Calcula la diferencia de tiempo en milisegundos
  const timeUntilNotification = fifteenMinutesBefore.getTime() - now.getTime();

  if (timeUntilNotification > 0) {
    setTimeout(() => {
      const message = `¡Recordatorio! Tienes una cita en 15 minutos a las ${appointmentDate.toLocaleTimeString()}`;
      notificationEvent.value = message;
      console.log('--- Notificación Simulada ---');
      console.log(message);
      console.log('-----------------------------');
    }, timeUntilNotification);
  } else {
    console.log('La cita ya ha pasado o está muy cerca, no se simulará la notificación.');
  }
};
