import MainLayout from "@/components/MainLayout";
import { catalogRoutes } from "@cart-web-vite/catalog/routes";
import { checkoutRoutes } from "@cart-web-vite/checkout/routes";
import { createRoutes, sharedRootRoute } from "@cart-web-vite/shared/routes/routes";
import { Outlet } from "@tanstack/react-router";

sharedRootRoute.options.component = () => (
  <MainLayout>
    <Outlet /> 
  </MainLayout>
);

export const router = createRoutes({ 
  routes: [
    catalogRoutes,
    checkoutRoutes
  ]
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
