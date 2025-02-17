import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  appType: 'spa',
  server: {
    host: true, // or '0.0.0.0' to listen on all hosts
    port: 5173, // You can optionally set a specific port
  },
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'apple-touch-icon.png',
        'android-chrome-192x192.png',
        'android-chrome-512x512.png',
        'site.webmanifest',
        'manifest.json',
        'sitemap.xml',
        'robots.txt',
      ],
      manifest: {
        name: 'GymNavigator',
        short_name: 'GymNavigator',
        description:
          'Transform your gym experience with GymNavigator. Feature-rich platform offering QR attendance, personalized workouts, and progress tracking.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: 'https://client.gymnavigator.in',
        scope: '/',
        id: 'in.gymnavigator.client',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 15000000,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/client\.gymnavigator\.in\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'gymnavigator-dynamic',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
    ViteImageOptimizer({
      jpg: {
        quality: 80,
      },
      png: {
        quality: 80,
      },
      webp: {
        quality: 75,
      },
    }),
  ],
  resolve: {
    alias: {
      '@components': '/src/Components',
      '@assets': '/src/assets',
      '@state': '/src/State',
      '@hooks': '/src/Hooks',
      '@routes': '/src/Routes', // Updated from "Routes" to "routes"
      '@config': '/src/routes', // Add this alias as alternative
      '@ui': '/src/Components/ui',
      '@lib': '/src/Components/lib',
      '@util': '/src/util',
      '@layouts': '/src/Layouts',
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    minify: 'esbuild',
    target: 'esnext',
    cssMinify: true,
    cssCodeSplit: true,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
          'ui-vendor': [
            '@mui/material',
            '@radix-ui/react-dialog',
            '@headlessui/react',
            '@radix-ui/react-avatar',
            '@radix-ui/react-label',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-slot',
          ],
          'utils-vendor': ['axios', 'date-fns', 'recoil'],
          'animation-vendor': ['framer-motion', '@react-spring/web'],
          'form-vendor': ['react-hook-form', 'zod'],
          'visualization-vendor': ['recharts'],
          features: [
            './src/Components/Home/Features/Flipcard.tsx',
            './src/Components/Home/mainsection/HeroSection.tsx',
          ],
          auth: ['./src/Components/Auth/Auth.tsx'],
          particles: ['react-tsparticles'],
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name ? assetInfo.name : 'unknown';
          const parts = info.split('.');
          let extType = parts.length > 1 ? parts[1] : 'unknown';
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'recoil', 'axios'],
    exclude: ['react-tsparticles'],
  },
});
