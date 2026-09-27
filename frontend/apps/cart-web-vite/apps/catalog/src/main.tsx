import { createRoutes } from '@cart-web-vite/shared/routes/routes'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { catalogRoutes } from './routes/routes'
import { RouterProvider } from '@tanstack/react-router'
import { AppProvider } from '@cart-web-vite/shared/providers/app-provider'

const router = createRoutes({ routes: [catalogRoutes]})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)