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
        name: 'QCU-FMS',
        short_name: 'QCU-FMS',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: "/16.png",
            type: "image/png",
            sizes: "16x16",
          },
          {
            src: "/20.png",
            type: "image/png",
            sizes: "20x20",
          },
          {
            src: "/32.png",
            type: "image/png",
            sizes: "32x32",
          },
          {
            src: "/64.png",
            type: "image/png",
            sizes: "64x64",
          },
          {
            src: "/144.png",
            type: "image/png",
            sizes: "144x144",
          },
          {
            src: '/192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/512.png',
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