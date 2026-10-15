import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './routes/routes'
import { RouterProvider } from '@tanstack/react-router'
import { AppProvider } from '@cart-web-vite/shared/providers/app-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)