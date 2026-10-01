import './MiniCart.css'
import { Button } from '@cart-web-vite/ui/Button'
import { CartSummary } from '../components/CartSummary'
import { CartItems } from '../components/CartItems'
import { dispatchCartIframe } from '@cart-web-vite/shared/utils/helpers'

function MiniCartContent() {
    const target = {
        getTargetWindow: () => window.parent,
        targetOrigin: 'http://localhost:5173'
    }

    const handleClick = () => {
        const messenger = dispatchCartIframe({
            ...target,
            targetWindow: target.getTargetWindow()
        })
        messenger({type: 'REDIRECT_TO_CART', path: '/carrinho'})
    }

    return (
        <div className="mini-cart__content">
            <CartItems size="small" target={target} />
            <CartSummary>
                <Button onClick={handleClick}>Ver Carrinho</Button>
            </CartSummary>
        </div>
    )
}

export function MiniCart() {    
    return (
        <div className="mini-cart">
            <MiniCartContent />
        </div>
    )
}