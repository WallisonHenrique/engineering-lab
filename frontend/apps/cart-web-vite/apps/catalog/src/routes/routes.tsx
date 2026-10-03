import { createRoute, lazyRouteComponent, Outlet } from '@tanstack/react-router';
import { sharedRootRoute } from '@cart-web-vite/shared/routes/routes';

export const catalogBaseRoute = createRoute({
  getParentRoute: () => sharedRootRoute,
  id: 'catalog-layout',
  component: () => <Outlet />,
});

export const productDetailRoute = createRoute({
  getParentRoute: () => catalogBaseRoute,
  path: '/produto/$id',
  component: lazyRouteComponent(() => import('../features/ProductDetailScreen').then(m => ({ default: m.ProductDetailScreen }))),
});

export const catalogRoutes = catalogBaseRoute.addChildren([
  productDetailRoute
]);
