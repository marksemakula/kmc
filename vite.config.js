import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: '/',
    define: {
      'process.env': {
        VITE_DEEPSEEK_API_KEY: JSON.stringify(env.VITE_DEEPSEEK_API_KEY),
        ...process.env
      }
    },
    server: {
      port: 3000,
      strictPort: true,
      proxy: {
        '/api': {
          target: 'https://api.deepseek.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization'
          }
        }
      },
      cors: {
        origin: true,
        credentials: true
      }
    },
    preview: {
      port: 3000,
      cors: {
        origin: true,
        credentials: true
      }
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
              '@reduxjs/toolkit',
              'react-responsive'
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
        'react-responsive'
      ],
      exclude: ['js-big-decimal']
    }
  };
});