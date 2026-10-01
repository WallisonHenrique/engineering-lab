import MainLayout from '@cart-web-vite/shared/components/MainLayout'
import { CartItems } from '../components/CartItems'
import { CartSummary } from "../components/CartSummary"

const MENU_ITEMS = [
    {label: 'Início', path: 'http://localhost:5173'},
    {label: 'Carrinho', path: '/carrinho'},
]

export function CartScreen() {
    const target = {
        getTargetWindow: () => window.__MINI_CART_WINDOW__,
        targetOrigin: 'http://localhost:5173/mini-carrinho'
    }

    return (
        <MainLayout menuItems={MENU_ITEMS}>
            <div className="cart">
                <CartItems target={target} />
                <CartSummary />
            </div> 
        </MainLayout>
    )
}