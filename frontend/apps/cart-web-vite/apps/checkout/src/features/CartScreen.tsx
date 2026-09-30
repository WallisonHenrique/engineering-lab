import { CartItems } from '../components/CartItems'
import { CartSummary } from "../components/CartSummary"

export function CartScreen() {
    const target = {
        targetWindow: window.__MINI_CART_WINDOW__,
        targetOrigin: 'http://localhost:5174/mini-carrinho'
    }

    return (
        <div className="cart">
            <CartItems target={target} />
            <CartSummary />
        </div>
    )
}