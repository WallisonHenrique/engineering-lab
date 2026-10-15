import { federation } from '@module-federation/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import mfConfig from './module-federation.config.ts'

export default defineConfig({
    plugins: [
        react(),
        federation(mfConfig)
    ],
    preview: {
        port: 4175,
        strictPort: true,
    },
})