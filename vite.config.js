import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/', // Critical for Netlify deployment
  server: {
    port: 3000, // Optional: Set your preferred dev server port
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Path aliases
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true, // Clears dist folder before build
    sourcemap: true, // Helps with debugging
    chunkSizeWarningLimit: 1600, // Adjust based on your needs
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react', 
            'react-dom', 
            'react-router-dom', 
            'react-redux', 
            '@reduxjs/toolkit'
          ],
          ui: ['framer-motion', 'react-icons'],
          charts: ['echarts', 'echarts-for-react'],
          utils: ['date-fns', 'xlsx']
        },
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom'
    ]
  }
});