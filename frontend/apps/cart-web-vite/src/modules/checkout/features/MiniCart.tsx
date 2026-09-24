import './MiniCart.css'
import { Link } from '@tanstack/react-router'
import { Button } from '@/shared/ui/Button'
import { CartSummary } from '@/modules/checkout/components/CartSummary'
import { CartItems } from '@/modules/checkout/components/CartItems'
import { useState } from 'react'
import { useCartTotalItems } from '@/modules/checkout/hooks/use-cart'

function MiniCartContent() {
    return (
        <div className="mini-cart__content">
            <CartItems size="small" />
            <CartSummary>
                <Link to="/carrinho">
                    <Button>Ver Carrinho</Button>
                </Link>
            </CartSummary>
        </div>
    )
}

function MiniCartButton({ onClick }: { onClick: () => void }) {
    const total = useCartTotalItems()

    return (
        <button className="mini-cart__btn" onClick={onClick}>
            &#128722;
            {total > 0 && <span className="mini-cart__badge">{total}</span>}
        </button>
    )
}

export function MiniCart() {
    const [open, setOpen] = useState(false)

    return (
        <div className="mini-cart">
            <MiniCartButton onClick={() => setOpen(prev => !prev)}/>
            {open && (
                <div className="mini-cart__dropdown">
                    <MiniCartContent />
                </div>
            )}
        </div>
    )
}