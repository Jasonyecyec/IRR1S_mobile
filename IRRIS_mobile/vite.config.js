import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'; // Make sure to import path


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'QCU-UPKEEP',
        short_name: 'QCU-UPKEEP',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: "/icon_16.png",
            type: "image/png",
            sizes: "16x16",
          },
          {
            src: "/icon_20.png",
            type: "image/png",
            sizes: "20x20",
          },
          {
            src: "/icon_32.png",
            type: "image/png",
            sizes: "32x32",
          },
          {
            src: "/icon_64.png",
            type: "image/png",
            sizes: "64x64",
          },
          {
            src: "/icon_144.png",
            type: "image/png",
            sizes: "144x144",
          },
          {
            src: '/icon_192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon_512.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'maskable'
          },
        ],
      },
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
})