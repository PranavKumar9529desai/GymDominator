import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // This handles automatic updates
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'android-chrome-512x512.png'],
      manifest: {
        name: 'GymNavigator',
        short_name: 'GymNav',
        description: 'Your personal gym management assistant',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // This makes your 512x512 icon maskable
          }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 3000000
      }
    })
  ],
  resolve: {
    alias: {
      "@components": "/src/Components",
      "@assets": "/src/assets",
      "@state": "/src/State",
      "@hooks": "/src/Hooks",
      "@routes": "/src/Routes",  // Updated from "Routes" to "routes"
      "@config": "/src/routes",  // Add this alias as alternative
      "@ui": "/src/Components/ui",
      "@lib": "/src/Components/lib",
      "@layouts": "/src/Layouts"
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1000kb
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
          'ui-vendor': ['@mui/material', '@radix-ui/react-dialog', '@headlessui/react'],
          'utils-vendor': ['axios', 'date-fns', 'recoil']
        }
      }
    }
  }
});
