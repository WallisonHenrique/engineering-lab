import { ProductCard } from "@/components/ProductCard"
import NumberField from "@/components/ui/NumberField"
import { useCart, useCartDispatch } from "@/modules/checkout/hooks/use-cart"
import type { CartItemModel } from "@/types/cart-types"
import type { SizeType } from "@/types/product-card-types"
import { memo } from "react"

export function CartQuantityControl({ item }: { item: CartItemModel }) {
    const dispatch = useCartDispatch()

    const handleChange = (value: number) => {
        if (value === 0) {
            dispatch({ type: "REMOVE_ITEM", id: item.id })
            return
        }

        dispatch({ 
            type: "CHANGE_QUANTITY", 
            id: item.id, 
            quantity: value
        })
    }

    return (
        <div className="cart__quantity-control">
            <NumberField 
                value={item.quantity} 
                min={0} 
                onChange={handleChange} 
            />
        </div>
    )
}

export const CartItem = memo(({ item, size }: { item: CartItemModel, size?: SizeType }) => (
    <div className="cart__item">
        <ProductCard size={size}>
            <ProductCard.Image url={item.image} alt={item.name} />
            <ProductCard.Name name={item.name} />
            <ProductCard.Price price={item.price} />
            <CartQuantityControl item={item} />
        </ProductCard>
    </div>
))

export function CartItems({ size }: { size?: SizeType}) {
    const cart = useCart()

    return (
        <div className="cart__items">
            {cart.allIds.map ((i) => <CartItem key={i} item={cart.byId[i]} size={size} />)}
        </div>
    )
}