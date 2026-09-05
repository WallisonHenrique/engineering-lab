import { createRootRoute, Outlet } from "@tanstack/react-router";
import MainLayout from "../components/main-layout";

export const Route = createRootRoute({
  component: () => (
    <MainLayout>
        <Outlet /> 
    </MainLayout>
  ),
})