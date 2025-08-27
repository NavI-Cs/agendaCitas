// src/router/index.ts
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import BookSearchPage from '@/views/BookSearchPage.vue';
import BookDetailsPage from '@/views/BookDetailsPage.vue';
import FavoritesPage from '@/views/FavoritesPage.vue';
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
        path: 'tab1',
        component: BookSearchPage,
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue'),
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue'),
      },
    ],
  },
  {
    path: '/book-details/:id', // Ruta con parámetro para el ID
    name: 'book-details',
    component: BookDetailsPage,
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesPage,
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
