import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React и Redux
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/react-redux') || 
              id.includes('node_modules/react-router-dom')) {
            return 'vendor-react';
          }
          
          // Redux Toolkit
          if (id.includes('node_modules/@reduxjs/toolkit')) {
            return 'vendor-rtk';
          }
          
          // Framer Motion
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer';
          }
          
          // Supabase
          if (id.includes('node_modules/@supabase')) {
            return 'vendor-supabase';
          }
          
          // Остальное в vendor (опционально)
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
  }
});