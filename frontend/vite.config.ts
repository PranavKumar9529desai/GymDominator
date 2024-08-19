import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/Components',
      '@assets': '/src/assets',
      '@state': '/src/State',
      '@hooks': '/src/Hooks',
      "@routes": "/src/Routes",
      "@ui": "/src/ui",
      "@lib": "/src/lib"
    }
  }

})
