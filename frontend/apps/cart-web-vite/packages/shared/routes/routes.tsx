import { createRootRoute, Outlet } from '@tanstack/react-router';
import { type AnyRoute, createRouter } from "@tanstack/react-router";

export const sharedRootRoute = createRootRoute({
  component: () => <Outlet />, 
})

export function createRoutes({ routes }: { routes: AnyRoute[] }) {
  const routeTree = sharedRootRoute.addChildren([
      ...routes,
  ]);

  return createRouter({ routeTree })
}