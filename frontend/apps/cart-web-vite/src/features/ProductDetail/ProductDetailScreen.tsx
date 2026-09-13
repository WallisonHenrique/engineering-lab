import { ProductCard } from "@/components/ProductCard"
import "./ProductDetailScreen.css"
import { useState } from "react"
import type { ProductModel } from "@/types/product"
import { useProduct } from "@/hooks"
import { TotalPrice } from "@/components/TotalPrice"
import { Button } from "@/components/Button/Button"
import { Link } from "@tanstack/react-router"
import { useCart, useCartDispatch } from "@/contexts"
import NumberField from "@/components/NumberField"

interface ProductDetailAddToCartBtnProps {
    quantity: number
    product: ProductModel
}

function ProductDetailAddToCartBtn({ quantity, product }: ProductDetailAddToCartBtnProps) {
    const dispatch = useCartDispatch()
    const totalPrice = product.price * quantity

    const handleClick = () => 
        dispatch({ type: "ADD_ITEM", payload: {...product, quantity}})

    return (
        <div className="product-detail__add-to-cart__btn">
            <Button onClick={handleClick}>
                Adicionar
                <TotalPrice value={totalPrice} />
            </Button>
        </div>
    )
}

function ProductDetailAddToCart({ product }: { product: ProductModel }) {
    const [quantity, setQuantity] = useState(1)

    return (
        <div className="product-detail__add-to-cart">
            <NumberField 
                value={quantity} 
                min={1} 
                onChange={(value: number) => setQuantity(value)} 
            />
            <ProductDetailAddToCartBtn quantity={quantity} product={product} />
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
            <div className="product-detail__view-cart__btn">
                <Link to="/carrinho">
                    <Button>Ver Carrinho</Button>
                </Link>
            </div>
        </div>
    )
}

function ProductDetailSummary({ product }: { product: ProductModel }) {
    const cart = useCart()
    const hasCart = cart.getItem({ id: product.id })

    return (
        <div className="product-detail__summary">
            { hasCart 
                ? <ProductDetailViewCart totalPrice={cart.totalPrice} /> 
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