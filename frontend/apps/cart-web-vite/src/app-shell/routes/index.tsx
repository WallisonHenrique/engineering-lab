import MainLayout from "@/app-shell/components/MainLayout";
import { catalogRoutes } from "@/modules/catalog";
import { checkoutRoutes } from "@/modules/checkout";
import { sharedRootRoute } from "@/shared/routes/routes";
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
