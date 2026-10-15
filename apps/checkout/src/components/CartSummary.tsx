import { TotalPrice } from "@cart-web-vite/shared/components/TotalPrice";
import { useCartTotalPrice } from "@cart-web-vite/shared/hooks/use-cart";
import type { BaseComponentProps } from "@cart-web-vite/shared/types/base-component-types";
import './CartSummary.css'

export function CartTotalPrice() {
    const total = useCartTotalPrice()
    
    return (
        <div className="cart__total-price">
            Total
            <TotalPrice value={total} />
        </div>
    )
}

export function CartSummary({ children }: BaseComponentProps) {
    return (
        <div className="cart__summary">
            <CartTotalPrice />
            {children}
        </div>
    )
}

