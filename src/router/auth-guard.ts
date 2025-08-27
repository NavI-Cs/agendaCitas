import { auth } from '@/services/firebase';
import { Router } from 'vue-router';

export const setupAuthGuard = (router: Router) => {
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const user = auth.currentUser;

    if (requiresAuth && !user) {
      console.log('User not authenticated, redirecting to login');
      next('/login');
    } else {
      next();
    }
  });
};