import React from "@vitejs/plugin-react";
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  plugins: [React()],
  server: {
    host: '0.0.0.0', // Correctly bind to all network interfaces
    port: 5173, // Explicitly set the port for deployment
    proxy: {
      '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
      },
      "/socket.io": {
        target: "http://localhost:3000",
        ws: true,
      },
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});