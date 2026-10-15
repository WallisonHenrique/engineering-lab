import { Link } from "@tanstack/react-router"
import { ProductCard } from "@cart-web-vite/shared/components/ProductCard"
import "./ProductListScreen.css"
import NumberField from "@cart-web-vite/ui/NumberField"
import { memo } from "react"
import { useCart, useCartDispatch } from "@cart-web-vite/shared/hooks/use-cart"
import type { CartItemModel } from "@cart-web-vite/shared/types/cart-types"
import type { ProductModel } from "../types/product-types"
import { useProducts } from "../hooks/use-products"
import { dispatchCartIframe } from "@cart-web-vite/shared/utils/helpers"
import type { CartAction } from "@cart-web-vite/shared/contexts/cart-contexts"

interface ProductListControlProps { 
    item: CartItemModel | null
    product: ProductModel 
}

const ProductListControl = memo(({ item, product }: ProductListControlProps) => {
    const dispatch = useCartDispatch()
    
    const handleChange = (value: number) => {
        const messenger = dispatchCartIframe({
            targetWindow: window.__MINI_CART_WINDOW__, 
            targetOrigin: `${import.meta.env.VITE_CHECKOUT_ORIGIN}/mini-carrinho`
        })

        if (!item) {
            const addItemAction: CartAction = {type: "ADD_ITEM", payload: {...product, quantity: value}}
            dispatch(addItemAction)
            messenger(addItemAction)
            return
        }

        if (value === 0) {
            const removeItemAction: CartAction = {type: "REMOVE_ITEM", id: product.id}
            dispatch(removeItemAction)
            messenger(removeItemAction)
            return
        }

        const changeQuantityAction: CartAction = {type: "CHANGE_QUANTITY", id: product.id, quantity: value}
        dispatch(changeQuantityAction)
        messenger(changeQuantityAction)
    }

    return (
        <div className="product-list__quantity">
            <NumberField
                value={item?.quantity || 0} 
                min={0} 
                onChange={handleChange} 
            />
        </div>
    )
})

function ProductListQuantity({ product }: { product: ProductModel }) {
    const cart = useCart()
    return (
        <div className="product-list__quantity-control">
            <ProductListControl item={cart.byId[product.id]} product={product} />
        </div>
    )
}

export function ProductListScreen() {
    const { products } = useProducts()

    if (!products) return <div>Produtos não encontrados!</div>

    return (
        <div className="product-list">
            { products.map(i => (
                <div key={i.id} className="product-list__item">
                    <Link
                        className="product-list__link"
                        to="/produto/$id" 
                        params={{ id: String(i.id) }}
                    ></Link>
                    <ProductCard>
                        <ProductCard.Image url={i.image} alt={i.name} />
                        <ProductCard.Name name={i.name} />
                        <ProductCard.Price price={i.price} />
                        <ProductListQuantity product={i} />
                    </ProductCard>
                </div>
            ))}
        </div>
    )
}