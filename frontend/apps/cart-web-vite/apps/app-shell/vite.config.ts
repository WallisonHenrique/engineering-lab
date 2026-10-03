import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import { federation } from '@module-federation/vite'
import mfConfig from './module-federation.config.ts'

export default defineConfig({
    plugins: [
      react(),
      federation(mfConfig)
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    build: {
      target: 'chrome89',
    },
    preview: {
      port: 4173,
      strictPort: true,
      proxy: {
        '/carrinho': {
          target: 'http://localhost:4174',
          changeOrigin: true,
          ws: true,
        },
        '/mini-carrinho': {
          target: 'http://localhost:4174',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/mini-carrinho/, '/carrinho'),
        }
      }
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