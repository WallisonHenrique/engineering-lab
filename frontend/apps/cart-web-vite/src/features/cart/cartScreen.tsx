import NumberField from "@/components/NumberField"
import { ProductCard } from "@/components/ProductCard"
import { TotalPrice } from "@/components/TotalPrice"
import { useCart, useCartDispatch } from "@/contexts"
import type { CartItemModel } from "@/types"
import './CartScreen.css'
import { memo } from "react"

function CartTotalTotalPrice() {
    const cart = useCart()

    return (
        <div className="cart__view-total-price">
            <div className="cart__total-price">
                Total
                <TotalPrice value={cart.totalPrice} />
            </div>
        </div>
    )
}

function CartSummary() {
    return (
        <div className="cart__summary">
            <CartTotalTotalPrice />
        </div>
    )
}

function CartQuantityControl({ item }: { item: CartItemModel }) {
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

function CartItem({ item }: { item: CartItemModel }) {
    return (
        <div className="cart__item">
            <ProductCard>
                <ProductCard.Image url={item.image} alt={item.name} />
                <ProductCard.Name name={item.name} />
                <ProductCard.Price price={item.price} />
                <CartQuantityControl item={item} />
            </ProductCard>
        </div>
    )
}

const MemoCartItem = memo(CartItem)

function CartItems() {
    const cart = useCart()
    const items = cart.items.map ((i) => 
        <MemoCartItem key={i.id} item={i} />
    )

    return <div className="cart__items">{items}</div>
}

export function CartScreen() {
    return (
        <div className="cart">
            <CartItems />
            <CartSummary />
        </div>
    )
}