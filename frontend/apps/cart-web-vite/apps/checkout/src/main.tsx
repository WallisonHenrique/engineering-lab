import { createRoutes } from '@cart-web-vite/shared/routes/routes'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { checkoutRoutes } from './routes/routes'
import { createRoute, lazyRouteComponent, RouterProvider } from '@tanstack/react-router'
import { AppProvider } from '@cart-web-vite/shared/providers/app-provider'

export const cartRoute = createRoute({
    getParentRoute: () => checkoutRoutes,
    path: '/',
    component: lazyRouteComponent(() => import('./features/MiniCart').then((m) => ({ default: m.MiniCart })))
})

checkoutRoutes.addChildren([
    cartRoute,
])

const router = createRoutes({ routes: [checkoutRoutes]})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)