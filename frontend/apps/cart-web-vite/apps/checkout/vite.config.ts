import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react()
  ],
  base: '/carrinho',
  preview: {
    port: 4174,
    strictPort: true,
  },
  server: {
    port: 5174,
    cors: true,
    hmr: {
      port: 5175,
    },
  },
})