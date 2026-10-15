import { MENU_ITEMS } from "@/routes/menu-items";
import MainLayout from "@cart-web-vite/shared/components/MainLayout";
import { useCartIframeListener } from "@cart-web-vite/shared/hooks/use-cart-iframe";
import { createRootRoute, createRoute, createRouter, lazyRouteComponent, Outlet } from "@tanstack/react-router";

function RootLayout() {
  useCartIframeListener({ senderOrigin: import.meta.env.VITE_CHECKOUT_ORIGIN });

  return (
    <MainLayout menuItems={MENU_ITEMS}>
      <Outlet />
    </MainLayout>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const productListRemoteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: lazyRouteComponent(() => import('catalog/ProductListScreen').then((m) => ({ default: m.ProductListScreen }))),
  errorComponent: ({ error }: { error: any }) => <div>{error.message}</div>,
});

const productDetailRemoteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/produto/$id',
  component: lazyRouteComponent(() => import('catalog/ProductDetailScreen').then((m) => ({ default: m.ProductDetailScreen }))),
  errorComponent: ({ error }: { error: any }) => <div>{error.message}</div>,
});

const cartRemoteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/carrinho',
  component: lazyRouteComponent(() => import('checkout/CartScreen').then((m) => ({ default: m.CartScreen }))),
  errorComponent: ({ error }: { error: any }) => <div>{error.message}</div>,
});

const routeTree = rootRoute.addChildren([
  productListRemoteRoute,
  productDetailRemoteRoute,
  cartRemoteRoute
]);

export const router = createRouter({ routeTree });