import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { cartRoute, checkoutBaseRoute } from './routes/routes'
import { createRoute, lazyRouteComponent, RouterProvider } from '@tanstack/react-router'
import { AppProvider } from '@cart-web-vite/shared/providers/app-provider'
import { createRoutes } from '@cart-web-vite/shared/routes/routes'
import '@cart-web-vite/shared/styles/global'

const minicartRoute = createRoute({
    getParentRoute: () => checkoutBaseRoute,
    path: '/mini-carrinho',
    component: lazyRouteComponent(() => import('./features/MiniCart').then((m) => ({ default: m.MiniCart })))
})

const checkoutRoutes = checkoutBaseRoute.addChildren([
    cartRoute,
    minicartRoute,
])

const router = createRoutes({ routes: [checkoutRoutes]})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)