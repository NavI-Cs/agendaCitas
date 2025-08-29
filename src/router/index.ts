// src/router/index.ts
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import AppointmentPage from '@/views/AppointmentPage.vue';
import HistoryPage from '@/views/HistoryPage.vue';
import LoginPage from '@/views/LoginPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1',
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1',
      },
      {
        path: 'tab1', // Vista de reservar cita
        component: AppointmentPage,
      },
      {
        path: 'tab2', // Vista de historial de citas
        component: HistoryPage,
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue'), // Puedes dejar esta o eliminarla
      },
    ],
  },
  {
    path: '/login',
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
