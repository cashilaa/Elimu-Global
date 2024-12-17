import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      proxy: {
        '/instructor': {
          target: 'http://localhost:3000', // Adjust this to your backend server's address and port
          changeOrigin: true,
          secure: false,
        },
      },
    },
    define: {
      'import.meta.env': env, // Make environment variables available in the app
    },
  };
});
