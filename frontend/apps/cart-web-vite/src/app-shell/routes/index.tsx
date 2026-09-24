import { ProductListScreen } from "@/modules/catalog/features/ProductListScreen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/')({
  component: () => <ProductListScreen />,
})