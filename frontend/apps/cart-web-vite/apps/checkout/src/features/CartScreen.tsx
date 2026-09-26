import { CartItems } from '../components/CartItems'
import { CartSummary } from "../components/CartSummary"

export function CartScreen() {
    return (
        <div className="cart">
            <CartItems />
            <CartSummary />
        </div>
    )
}