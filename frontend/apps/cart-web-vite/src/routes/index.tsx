import { createFileRoute } from "@tanstack/react-router";
import { ProductListScreen } from "@/features/ProductList";

export const Route = createFileRoute('/')({
  component: () => <ProductListScreen />,
})