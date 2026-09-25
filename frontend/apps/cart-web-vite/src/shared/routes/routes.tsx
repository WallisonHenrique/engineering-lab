import { createRootRoute, Outlet } from '@tanstack/react-router';

export const sharedRootRoute = createRootRoute({
  component: () => <Outlet />, 
});