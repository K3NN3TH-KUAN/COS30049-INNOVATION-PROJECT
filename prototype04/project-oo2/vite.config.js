import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/prototype04/project-oo2/src/backend': {
        target: 'http://localhost', // Change to match your PHP server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

