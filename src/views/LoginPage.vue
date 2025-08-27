<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div class="login-container">
        <h1>App Buscador de Libros</h1>
        <p>Ingresa y busca tu libro favorito.</p>
        <ion-button @click="handleSignIn" expand="block">
          <ion-icon :icon="logoGoogle"></ion-icon>
          Sign in with Google
        </ion-button>
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
  IonButton,
  IonIcon,
  useIonRouter,
} from '@ionic/vue';
import { logoGoogle } from 'ionicons/icons';
import { signInWithGoogle } from '@/services/auth.service';

const router = useIonRouter();

const handleSignIn = async () => {
  try {
    await signInWithGoogle();
    router.push('/tabs/tab1');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
}
</style>