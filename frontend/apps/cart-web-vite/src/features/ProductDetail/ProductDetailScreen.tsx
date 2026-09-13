import { ProductCard } from "@/components/ProductCard";
import "./ProductDetailScreen.css"
import { useState } from "react";
import type { ProductModel } from "@/types/product";
import { useProduct } from "@/hooks";
import { TotalPrice } from "@/components/TotalPrice";
import { Button } from "@/components/Button/Button";
import { Link } from "@tanstack/react-router";
import { useCart, useCartDispatch } from "@/contexts";
import NumberField from "@/components/NumberField";

function ProductDetailAddToCart({ product }: { product: ProductModel }) {
    const dispatch = useCartDispatch()
    const [quantity, setQuantity] = useState(1)
    const total = product.price * quantity

    const handleQuantityChange = (value: number) => setQuantity(value)
    const handleAddToCart = () => {
        dispatch({ type: "ADD_ITEM", payload: {...product, quantity}})
    }

    return (
        <div className="product-detail__add-to-cart">
            <NumberField 
                value={quantity} 
                min={1} 
                onChange={handleQuantityChange} 
            />
            <Button onClick={handleAddToCart}>
                Adicionar
                <TotalPrice value={total} />
            </Button>
        </div>
    )
}

function ProductDetailViewCart({ totalPrice }: { totalPrice: number }){
    return (
        <div className="product-detail__view-cart">
            <div className="product-detail__total-price">
                Total
                <TotalPrice value={totalPrice} />
            </div>
            <Link to="/carrinho">
                <Button>Ver Carrinho</Button>
            </Link>
        </div>
    )
}

function ProductDetailSummary({ product }: { product: ProductModel }) {
    const { totalPrice, getItem } = useCart()
    const hasCart = getItem({ id: product.id })

    return (
        <div className="product-detail__summary">
            { hasCart 
                ? <ProductDetailViewCart totalPrice={totalPrice} /> 
                : <ProductDetailAddToCart product={product} />
            }
        </div>
    )
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
    )
}

export function ProductDetailScreen({ id }: { id: string }) {
    const { product } = useProduct({ id });

    if (!product) return <div>Produto não encontrado!</div>
    return (
        <div className="product-detail">
            <ProductDetailItem product={product} />
            <ProductDetailSummary product={product} />
        </div>
    )
}