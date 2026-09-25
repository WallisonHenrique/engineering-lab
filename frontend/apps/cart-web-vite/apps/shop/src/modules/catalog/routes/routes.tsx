import { createRoute, lazyRouteComponent, Outlet } from '@tanstack/react-router';
import { sharedRootRoute } from '@/shared/routes/routes';

export const catalogBaseRoute = createRoute({
  getParentRoute: () => sharedRootRoute,
  id: 'catalog-layout',
  component: () => <Outlet />,
});

export const productListRoute = createRoute({
  getParentRoute: () => catalogBaseRoute,
  path: '/',
  component: lazyRouteComponent(() => import('@/modules/catalog/features/ProductListScreen').then(m => ({ default: m.ProductListScreen }))),
});

export const productDetailRoute = createRoute({
  getParentRoute: () => catalogBaseRoute,
  path: '/produto/$id',
  component: lazyRouteComponent(() => import('@/modules/catalog/features/ProductDetailScreen').then(m => ({ default: m.ProductDetailScreen }))),
});

export const catalogRoutes = catalogBaseRoute.addChildren([
  productListRoute,
  productDetailRoute
]);
