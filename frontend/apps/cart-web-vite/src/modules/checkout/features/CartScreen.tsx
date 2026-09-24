import { CartItems } from '@/modules/checkout/components/CartItems'
import { CartSummary } from "@/modules/checkout/components/CartSummary"

export function CartScreen() {
    return (
        <div className="cart">
            <CartItems />
            <CartSummary />
        </div>
    )
}