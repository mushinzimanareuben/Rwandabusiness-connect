import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Firebase services split by module
          'firebase-app':       ['firebase/app'],
          'firebase-auth':      ['firebase/auth'],
          'firebase-firestore': ['firebase/firestore'],
          'firebase-storage':   ['firebase/storage'],
          'firebase-analytics': ['firebase/analytics'],
          // UI & animation
          ui: ['framer-motion', 'lucide-react', 'react-icons'],
          // Charts
          charts: ['recharts'],
          // Forms
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          // Other libs
          misc: ['zustand', 'date-fns', 'react-hot-toast', 'react-select', 'swiper'],
        },
      },
    },
  },
})
