import { Link } from "@tanstack/react-router"
import { ProductCard } from "@/components/ProductCard"
import "./ProductListScreen.css"
import { useProducts } from "@/hooks"
import { useCart, useCartDispatch } from "@/contexts"
import NumberField from "@/components/ui/NumberField"
import type { CartItemModel, ProductModel } from "@/types"
import { memo } from "react"

interface ProductListControlProps { 
    item: CartItemModel | null
    product: ProductModel 
}

const ProductListControl = memo(({ item, product }: ProductListControlProps) => {
    const dispatch = useCartDispatch()

    const handleChange = (value: number) => {
        if (!item) {
            dispatch({ type: "ADD_ITEM", payload: { ...product, quantity: value } })
            return
        }

        if (value === 0) {
            dispatch({ type: "REMOVE_ITEM", id: product.id })
            return
        }

        dispatch({ 
            type: "CHANGE_QUANTITY", 
            id: product.id, 
            quantity: value
        })
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

    if (!products) return <div>Produto não encontrado!</div>

    return (
        <div className="product-list">
            { products.map(i => (
                <div className="product-list__item">
                    <Link
                        key={i.id}
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