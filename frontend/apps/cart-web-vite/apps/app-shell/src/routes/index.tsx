import MainLayout from "@/components/MainLayout";
import { catalogRoutes } from "@cart-web-vite/catalog/routes";
import { checkoutRoutes } from "@cart-web-vite/checkout/routes";
import { sharedRootRoute } from "@cart-web-vite/shared/routes/routes";
import { createRouter, Outlet } from "@tanstack/react-router";

sharedRootRoute.options.component = () => (
  <MainLayout>
    <Outlet /> 
  </MainLayout>
);

export const routeTree = sharedRootRoute.addChildren([
  catalogRoutes,
  checkoutRoutes
]);

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
