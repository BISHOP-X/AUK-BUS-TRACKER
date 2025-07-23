import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from 'vite-plugin-pwa';
import basicSsl from '@vitejs/plugin-basic-ssl';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    basicSsl(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'auk logo.png'],
      manifest: {
        name: 'AUK Bus Tracker',
        short_name: 'AUKBus',
        description: 'Real-time bus tracking for Ashesi University of Kumasi',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'auk logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'auk logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'auk logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
