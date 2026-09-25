import { sharedRootRoute } from "@/shared/routes/routes";
import { createRoute, lazyRouteComponent, Outlet } from "@tanstack/react-router";

export const checkoutBaseRoute = createRoute({
    getParentRoute: () => sharedRootRoute,
    id: 'checkout-layout',
    component: () => <Outlet />,
 })

export const cartRoute = createRoute({
    getParentRoute: () => checkoutBaseRoute,
    path: '/carrinho',
    component: lazyRouteComponent(() => import('@/modules/checkout/features/CartScreen').then((m) => ({ default: m.CartScreen })))
})

export const checkoutRoutes = checkoutBaseRoute.addChildren([
    cartRoute,
])