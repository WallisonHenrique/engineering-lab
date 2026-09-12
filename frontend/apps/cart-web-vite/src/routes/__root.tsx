import { createRootRoute, Outlet } from "@tanstack/react-router";
import MainLayout from "../components/main-layout";
import { CartProvider } from "@/contexts";

export const Route = createRootRoute({
  component: () => (
    <CartProvider>
      <MainLayout>
          <Outlet /> 
      </MainLayout>
    </CartProvider>
  ),
})