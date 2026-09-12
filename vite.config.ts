import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['offline.html', 'icons/*.png'],
      manifest: {
        name: 'RVUNL Junior Assistant Exam Prep',
        short_name: 'RVUNL Prep',
        description: 'Bilingual exam preparation app for RVUNL Junior Assistant / Commercial Assistant-II',
        theme_color: '#0f766e',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        navigateFallback: '/offline.html',
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']
      }
    })
  ],
  resolve: {
    alias: { '@': '/src' }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts']
  }
})
