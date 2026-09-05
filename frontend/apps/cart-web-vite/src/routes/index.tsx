import { createFileRoute } from "@tanstack/react-router";
import ProductListScreen from "../features/products/productListScreen";

export const Route = createFileRoute('/')({
  component: () => <ProductListScreen />,
})