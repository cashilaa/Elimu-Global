import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      host: '0.0.0.0', // Specify the host
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      target: 'esnext', // Ensure compatibility with modern browsers
      cssCodeSplit: true, // Enable CSS code splitting
      chunkSizeWarningLimit: 1000, // Set a warning limit for chunk size (in KB)
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'], // Split vendor libraries
          },
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom'], // Pre-bundle essential dependencies
    },
  };
});
