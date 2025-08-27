import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Dev proxy to avoid cross-origin issues when hitting Render from localhost
  server: {
    proxy: {
      '/api': {
        target: 'https://hote-booking-bookotel.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  }
})
