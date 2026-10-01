import { catalogMenuItems } from "@cart-web-vite/catalog/menu";
import { catalogRoutes } from "@cart-web-vite/catalog/routes";
import MainLayout from "@cart-web-vite/shared/components/MainLayout";
import { useCartIframeListener } from "@cart-web-vite/shared/hooks/use-cart-iframe";
import { createRoutes, sharedRootRoute } from "@cart-web-vite/shared/routes/routes";
import type { MenuItemModel } from "@cart-web-vite/shared/types/menu-types";
import { Outlet } from "@tanstack/react-router";

const MENU_ITEMS: MenuItemModel[] = [
    ...catalogMenuItems,
    {label: 'Carrinho', path: 'http://localhost:5173/carrinho'},
];

sharedRootRoute.options.component = () => {
  useCartIframeListener({senderOrigin: 'http://localhost:5173'})

  return (
    <MainLayout menuItems={MENU_ITEMS}>
      <Outlet /> 
    </MainLayout>
  )
}

export const router = createRoutes({ 
  routes: [
    catalogRoutes
  ]
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
