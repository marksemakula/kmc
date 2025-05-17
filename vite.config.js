import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  // Only expose VITE_* environment variables to the client for security
  const clientEnv = {};
  Object.keys(env).forEach((key) => {
    if (key.startsWith('VITE_')) {
      clientEnv[key] = env[key];
    }
  });

  return {
    plugins: [react()],
    define: {
      'process.env': clientEnv, // Only expose VITE_* variables to client
    },
    server: {
      port: 3000,
      open: true, // Automatically open the app in browser
      proxy: {
        '/openai': {
          target: 'https://api.openai.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/openai/, ''),
          headers: {
            'Authorization': `Bearer ${env.VITE_OPENAI_API_KEY}`
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        // Add more aliases if needed
      }
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: mode !== 'production', // Generate sourcemaps in dev
      minify: 'terser', // Enable minification in production
      terserOptions: {
        compress: {
          drop_console: mode === 'production', // Remove console.log in production
        },
      },
    },
    preview: {
      port: 3000 // Same as dev server for consistency
    }
  };
});