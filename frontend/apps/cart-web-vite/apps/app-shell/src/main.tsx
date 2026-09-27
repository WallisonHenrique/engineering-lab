import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from '@cart-web-vite/shared/providers/app-provider'
import { RouterProvider } from '@tanstack/react-router'
import { router } from '@/routes'
import '@/styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
        <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)
