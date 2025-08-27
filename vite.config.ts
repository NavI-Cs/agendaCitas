/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa' // <-- Nueva importación

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    VitePWA({ // <-- Nueva configuración del plugin
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'assets/icon-192.png', 'assets/icon-512.png'],
      manifest: {
        name: 'Hechos Curiosos Diarios',
        short_name: 'Hechos',
        description: 'Una app de hechos curiosos diarios.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'assets/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'assets/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})