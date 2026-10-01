import { createRootRoute, createRoute, createRouter, lazyRouteComponent, Outlet } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => <Outlet />, 
})

export const cartRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/carrinho',
    component: lazyRouteComponent(() => import('../features/CartScreen').then((m) => ({ default: m.CartScreen })))
})

const minicartRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/mini-carrinho',
    component: lazyRouteComponent(() => import('../features/MiniCart').then((m) => ({ default: m.MiniCart })))
})

const routeTree = rootRoute.addChildren([
    cartRoute,
    minicartRoute
]);

export const router = createRouter({ routeTree })