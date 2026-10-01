import MainLayout from "@/components/MainLayout";
import { catalogRoutes } from "@cart-web-vite/catalog/routes";
import { useCartIframeListener } from "@cart-web-vite/shared/hooks/use-cart-iframe";
import { createRoutes, sharedRootRoute } from "@cart-web-vite/shared/routes/routes";
import { Outlet } from "@tanstack/react-router";

sharedRootRoute.options.component = () => {
  useCartIframeListener({senderOrigin: 'http://localhost:5174'})

  return (
    <MainLayout>
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
