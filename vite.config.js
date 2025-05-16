import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 3000,
    historyApiFallback: true, // Added for BrowserRouter support
    strictPort: true, // Ensures Vite fails if port is in use
  },
  preview: {
    port: 3000, // Optional: Set preview port to match dev server
    historyApiFallback: true // Added for preview mode
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    chunkSizeWarningLimit: 1600,
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
    ],
    exclude: ['js-big-decimal'] // Optional: Add any dependencies to exclude
  }
});