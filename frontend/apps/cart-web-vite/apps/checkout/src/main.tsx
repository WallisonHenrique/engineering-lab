import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { AppProvider } from '@cart-web-vite/shared/providers/app-provider'
import '@cart-web-vite/shared/styles/global'
import { router } from './routes/routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)