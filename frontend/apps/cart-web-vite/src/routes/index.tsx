import { ProductListScreen } from "@/features/ProductList/ProductListScreen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/')({
  component: () => <ProductListScreen />,
})