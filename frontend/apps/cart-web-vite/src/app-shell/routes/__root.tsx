import { createRootRoute, Outlet } from "@tanstack/react-router";
import MainLayout from "../components/MainLayout";
import { CartProvider } from "@/contexts/CartProvider";

export const Route = createRootRoute({
  component: () => (
    <CartProvider>
      <MainLayout>
          <Outlet /> 
      </MainLayout>
    </CartProvider>
  ),
})