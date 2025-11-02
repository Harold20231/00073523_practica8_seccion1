// Cliente-FE/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Configuración del proxy para redirigir llamadas del FE al BE
    proxy: {
      // ⚠️ CRÍTICO: Redirige /api a tu Backend en 3001
      '/api': {
        target: 'http://localhost:3001', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Elimina '/api' del path antes de enviarlo al BE
      },
    },
  },
});