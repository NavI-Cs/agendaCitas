// src/services/appointments.service.ts
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase'; // Importa la instancia de Firestore

export interface Appointment {
  id?: string; // Añade un ID para la cita
  userId: string;
  date: Date;
  reason: string;
  createdAt: Timestamp;
}

/**
 * Guarda una nueva cita en Firestore.
 * @param userId - El ID del usuario autenticado.
 * @param date - La fecha y hora de la cita.
 * @param reason - El motivo de la cita.
 * @returns El ID de la cita creada.
 */
export const saveAppointment = async (
  userId: string,
  date: Date,
  reason: string,
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'appointments'), {
      userId,
      date,
      reason,
      createdAt: Timestamp.now(),
    });
    console.log('Cita guardada con ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error al guardar la cita:', error);
    throw new Error('No se pudo guardar la cita. Inténtalo de nuevo.');
  }
};

/**
 * Escucha en tiempo real los cambios en el historial de citas de un usuario.
 * @param userId - El ID del usuario autenticado.
 * @param callback - La función que se ejecutará con los datos actualizados.
 * @returns La función para dejar de escuchar los cambios.
 */
export const subscribeToAppointmentHistory = (
  userId: string,
  callback: (appointments: Appointment[]) => void,
) => {
  // Crea una consulta para obtener citas del usuario ordenadas por fecha
  const appointmentsQuery = query(
    collection(db, 'appointments'),
    where('userId', '==', userId),
    orderBy('date', 'desc'),
  );

  // onSnapshot es el listener en tiempo real
  const unsubscribe = onSnapshot(appointmentsQuery, (querySnapshot) => {
    const appointments: Appointment[] = [];
    querySnapshot.forEach((doc) => {
      // Mapea los datos del documento a la interfaz Appointment
      const data = doc.data();
      appointments.push({
        id: doc.id,
        userId: data.userId,
        date: data.date.toDate(),
        reason: data.reason,
        createdAt: data.createdAt,
      });
    });
    // Llama al callback con los datos actualizados
    callback(appointments);
  });

  return unsubscribe;
};
