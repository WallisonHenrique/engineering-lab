import { useCart } from '@/contexts'
import './MiniCart.css'
import CartItem from '@/components/cart-item'
import { TotalPrice } from '@/components/TotalPrice'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/Button'

function MiniCartTotalPrice() {
    const cart = useCart()

    return (
        <div className="mini-cart__total-price">
            Total
            <TotalPrice value={cart.totalPrice} />
        </div>
    )
}

function MiniCartSummary() {
    return (
        <div className="mini-cart__summary">
            <div className="mini-cart__view-cart">
                <MiniCartTotalPrice />
                <Link to="/carrinho">
                    <Button>Ver Carrinho</Button>
                </Link>
            </div>
        </div>
    )
}

function MiniCartItems() {
    const cart = useCart()
    const items = cart.items.map(i => <CartItem key={i.id} product={i} />)

    return (
        <div className="mini-cart__items">{items}</div>
    )
}

export function MiniCart() {
    return (
        <div className="mini-cart">
            <MiniCartItems />
            <MiniCartSummary />
        </div>
    )
}