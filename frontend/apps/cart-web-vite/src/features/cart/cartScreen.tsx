import NumberField from "@/components/NumberField"
import { ProductCard } from "@/components/ProductCard"
import { TotalPrice } from "@/components/TotalPrice"
import { useCart, useCartDispatch } from "@/contexts"
import type { CartItemModel } from "@/types"
import './CartScreen.css'

function CartQuantityControl({ item }: { item: CartItemModel }) {
    const dispatch = useCartDispatch()

    const handleChange = (value: number) => {
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
                min={1} 
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

export function CartScreen() {
    const cart = useCart()
    
    return (
        <div className="cart">
            <div className="title">Carrinho</div>
            <div className="cart__items">
                { cart.items.map ((item) => 
                    <CartItem item={item} />
                )}
            </div>
            <div className="cart__summary">
                <div className="cart__view-total-price">
                    <div className="cart__total-price">
                        Total
                        <TotalPrice value={cart.totalPrice} />
                    </div>
                </div>
            </div>
        </div>
    )
}