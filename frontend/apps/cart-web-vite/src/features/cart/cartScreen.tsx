import NumberField from "@/components/NumberField"
import { ProductCard } from "@/components/ProductCard"
import { useCart, useCartDispatch } from "@/contexts"
import type { CartItemModel } from "@/types"

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
    const { items } = useCart()
    
    return (
        <div className="cart">
            <div className="title">Carrinho</div>
            <div className="cart__items">
                { items.map ((item) => 
                    <CartItem item={item} />
                )}
            </div>
            <div className="cart__summary"></div>
        </div>
    )
}