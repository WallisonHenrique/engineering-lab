import { createRootRoute, createRoute, createRouter, lazyRouteComponent, Outlet } from '@tanstack/react-router';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const productListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: lazyRouteComponent(() => import('../features/ProductListScreen').then(m => ({ default: m.ProductListScreen }))),
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/produto/$id',
  component: lazyRouteComponent(() => import('../features/ProductDetailScreen').then(m => ({ default: m.ProductDetailScreen }))),
});

const routeTree = rootRoute.addChildren([
  productListRoute,
  productDetailRoute,
])

export const router = createRouter({ routeTree })