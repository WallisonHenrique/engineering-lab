import { useState } from "react";
import type { ProductModel } from "../types/product-types";
import NumberField from "@cart-web-vite/ui/NumberField";
import { ProductDetailAddToCartBtn } from "./ProductDetailAddToCartBtn";

export function ProductDetailAddToCart({ product }: { product: ProductModel }) {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="product-detail__add-to-cart">
      <NumberField
        value={quantity}
        min={1}
        onChange={(value: number) => setQuantity(value)}
      />
      <ProductDetailAddToCartBtn quantity={quantity} product={product} />
    </div>
  );
}
