import { defineConfig } from 'vite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
import React from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Expose to all networks
    port: 5173, // Explicitly set the port for deployment
    proxy: {
      "/api": {
        target: "http://localhost:3000",
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
