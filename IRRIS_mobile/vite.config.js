import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'IRRIS',
        short_name: 'IRRIS',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: "/icon_192.png",
            type: "image/png",
            sizes: "64x64 32x32 24x24 16x16",
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
})