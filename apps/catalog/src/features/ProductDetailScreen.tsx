import { ProductCard } from "@cart-web-vite/shared/components/ProductCard";
import "./ProductDetailScreen.css";
import { TotalPrice } from "@cart-web-vite/shared/components/TotalPrice";
import { Button } from "@cart-web-vite/ui/Button";
import {
  useCart,
  useCartTotalPrice,
} from "@cart-web-vite/shared/hooks/use-cart";
import { useParams } from "@tanstack/react-router";
import type { ProductModel } from "../types/product-types";
import { useProduct } from "../hooks/use-products";
import { ProductDetailAddToCart } from "./ProductDetailAddToCart";

function ProductDetailViewCart() {
  const total = useCartTotalPrice();
  return (
    <div className="product-detail__view-cart">
      <div className="product-detail__total-price">
        Total
        <TotalPrice value={total} />
      </div>
      <div className="product-detail__view-cart__btn">
        <a href="/carrinho">
          <Button>Ver Carrinho</Button>
        </a>
      </div>
    </div>
  );
}

function ProductDetailSummary({ product }: { product: ProductModel }) {
  const cart = useCart();

  return (
    <div className="product-detail__summary">
      {cart.byId[product.id] ? (
        <ProductDetailViewCart />
      ) : (
        <ProductDetailAddToCart product={product} />
      )}
    </div>
  );
}

function ProductDetailItem({ product }: { product: ProductModel }) {
  return (
    <div className="product-detail__item">
      <ProductCard>
        <ProductCard.Image url={product.image} alt={product.name} />
        <ProductCard.Name name={product.name} />
        <ProductCard.Price price={product.price} />
      </ProductCard>
    </div>
  );
}

export function ProductDetailScreen() {
  const { id } = useParams({ from: "/produto/$id" });
  const { product } = useProduct({ id });

  if (!product) return <div>Produto não encontrado!</div>;

  return (
    <div className="product-detail">
      <ProductDetailItem product={product} />
      <ProductDetailSummary product={product} />
    </div>
  );
}
