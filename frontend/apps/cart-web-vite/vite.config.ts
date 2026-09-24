import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tanstackRouter from '@tanstack/router-plugin/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      routesDirectory: './src/app-shell/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    }),
    react()
  ],
  resolve: {
    alias: {
      // Diz ao Vite que qualquer import começando com "@/" aponta para a pasta "src"
      '@': path.resolve(__dirname, './src'),
    },
  },
})
