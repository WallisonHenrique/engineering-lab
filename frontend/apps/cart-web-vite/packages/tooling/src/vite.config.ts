import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export function createViteConfig({ dirname }: { dirname: string }) {
  return defineConfig({
    plugins: [
      react()
    ],
    resolve: {
      alias: {
        '@': path.resolve(dirname, './src'),
      },
    },
  })
}