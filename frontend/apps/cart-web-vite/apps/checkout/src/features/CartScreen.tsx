import { CartItems } from '../components/CartItems'
import { CartSummary } from "../components/CartSummary"

export function CartScreen() {
    const target = {
        getTargetWindow: () => window.__MINI_CART_WINDOW__,
        targetOrigin: `${import.meta.env.VITE_CHECKOUT_ORIGIN}/mini-carrinho`
    }

    return (
        <div className="cart">
            <CartItems target={target} />
            <CartSummary />
        </div> 
    )
}