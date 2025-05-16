import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables based on mode (development/production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: '/',
    define: {
      'process.env': {
        VITE_DEEPSEEK_API_KEY: JSON.stringify(env.VITE_DEEPSEEK_API_KEY),
        // Preserve other env variables if needed
        ...process.env
      }
    },
    server: {
      port: 3000,
      historyApiFallback: true,
      strictPort: true,
    },
    preview: {
      port: 3000,
      historyApiFallback: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        // Add any additional aliases if needed
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
              '@reduxjs/toolkit',
              'react-responsive' // Added for chat responsiveness
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
        'react-router-dom',
        'react-responsive' // Added for optimization
      ],
      exclude: ['js-big-decimal']
    }
  };
});