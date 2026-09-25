import { ProductCard } from "@/shared/components/ProductCard"
import "./ProductDetailScreen.css"
import { useState } from "react"
import { TotalPrice } from "@/shared/components/TotalPrice"
import { Button } from "@/shared/ui/Button"
import { Link } from "@tanstack/react-router"
import NumberField from "@/shared/ui/NumberField"
import { useCart, useCartDispatch, useCartTotalPrice } from "@/modules/checkout/hooks/use-cart"
import { useProduct } from "@/modules/catalog/hooks/use-products"
import type { ProductModel } from "@/modules/catalog/types/product-types"
import { useParams } from "@tanstack/react-router"

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

function ProductDetailViewCart() {
    const total = useCartTotalPrice()
    return (
        <div className="product-detail__view-cart">
            <div className="product-detail__total-price">
                Total
                <TotalPrice value={total} />
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
    
    return (
        <div className="product-detail__summary">
            { cart.byId[product.id] 
                ? <ProductDetailViewCart /> 
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

export function ProductDetailScreen() {
    const { id } = useParams({ from: '/catalog-layout/produto/$id' }); 
    const { product } = useProduct({ id });

    if (!product) return <div>Produto não encontrado!</div>
    
    return (
        <div className="product-detail">
            <ProductDetailItem product={product} />
            <ProductDetailSummary product={product} />
        </div>
    )
}