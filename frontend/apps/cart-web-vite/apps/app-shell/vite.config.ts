import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    plugins: [
      react()
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    server: {
      port: 5173,
      strictPort: true,
      proxy: {
        '/carrinho': {
          target: 'http://localhost:5174',
          changeOrigin: true,
          ws: true,
        },
        '/mini-carrinho': {
          target: 'http://localhost:5174',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/mini-carrinho/, '/carrinho'),
        },
      },
    },
  })