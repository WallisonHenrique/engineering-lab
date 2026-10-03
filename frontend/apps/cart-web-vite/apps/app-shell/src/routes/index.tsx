import { MENU_ITEMS } from "@/routes/menu-items";
import { catalogRoutes } from "@cart-web-vite/catalog/routes";
import MainLayout from "@cart-web-vite/shared/components/MainLayout";
import { useCartIframeListener } from "@cart-web-vite/shared/hooks/use-cart-iframe";
import { createRoutes, sharedRootRoute } from "@cart-web-vite/shared/routes/routes";
import { createRoute, lazyRouteComponent, Outlet } from "@tanstack/react-router";

const productListRemoteRoute = createRoute({
  getParentRoute: () => catalogRoutes,
  path: '/',
  component: lazyRouteComponent(() => import('productList/ProductListScreen').then(m => ({ default: m.ProductListScreen }))),
  errorComponent: ({ error }: {error: any}) => <div>{error.message}</div>
});

sharedRootRoute.options.component = () => {
  useCartIframeListener({senderOrigin: import.meta.env.VITE_CHECKOUT_ORIGIN})

  return (
    <MainLayout menuItems={MENU_ITEMS}>
      <Outlet /> 
    </MainLayout>
  )
}

export const router = createRoutes({ 
  routes: [
    catalogRoutes,
    productListRemoteRoute
  ]
})