import { ProductCard } from "@cart-web-vite/shared/components/ProductCard"
import NumberField from "@cart-web-vite/ui/NumberField"
import { useCart, useCartDispatch } from "@cart-web-vite/shared/hooks/use-cart"
import type { CartItemModel } from "@cart-web-vite/shared/types/cart-types"
import type { SizeType } from "@cart-web-vite/shared/types/product-card-types"
import { memo } from "react"
import { dispatchCartIframe, type DispatchCartIframe } from "@cart-web-vite/shared/utils/helpers"
import type { CartAction } from "@cart-web-vite/shared/contexts/cart-contexts"

interface CartQuantyControlProps {
    item: CartItemModel
    target: DispatchCartIframe
}

interface CartItemProps {
    item: CartItemModel
    size?: SizeType
    target: DispatchCartIframe
}

export function CartQuantityControl({ item, target }: CartQuantyControlProps) {
    const dispatch = useCartDispatch()

    const handleChange = (value: number) => {
        const messenger = dispatchCartIframe(target)

        if (value === 0) {
            const removeItemAction: CartAction = {type: "REMOVE_ITEM", id: item.id}
            dispatch(removeItemAction)
            messenger(removeItemAction)
            return
        }

        const changeQuantityAction: CartAction = {
            type: "CHANGE_QUANTITY", 
            id: item.id, 
            quantity: value
        }
        dispatch(changeQuantityAction)
        messenger(changeQuantityAction)
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

export const CartItem = memo(({ item, size, target }: CartItemProps) => (
    <div className="cart__item">
        <ProductCard size={size}>
            <ProductCard.Image url={item.image} alt={item.name} />
            <ProductCard.Name name={item.name} />
            <ProductCard.Price price={item.price} />
            <CartQuantityControl item={item} target={target} />
        </ProductCard>
    </div>
))

export function CartItems({ size, target }: { size?: SizeType, target: DispatchCartIframe}) {
    const cart = useCart()

    return (
        <div className="cart__items">
            {cart.allIds.map ((i) => (
                <CartItem key={i} item={cart.byId[i]} size={size} target={target} />
            ))}
        </div>
    )
}