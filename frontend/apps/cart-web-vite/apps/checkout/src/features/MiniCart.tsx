import './MiniCart.css'
import { Button } from '@cart-web-vite/ui/Button'
import { CartSummary } from '../components/CartSummary'
import { CartItems } from '../components/CartItems'
import { useCartIframeListener } from '@cart-web-vite/shared/hooks/use-cart-iframe'

const TARGET_ORIGIN = 'http://localhost:5173'

function MiniCartContent() {
    const target = {targetWindow: window.parent, targetOrigin: TARGET_ORIGIN}

    const handleClick = () => {
        window.parent.location.href = TARGET_ORIGIN + '/carrinho';
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
    useCartIframeListener({senderOrigin: 'http://localhost:5173'})
    
    return (
        <div className="mini-cart">
            <MiniCartContent />
        </div>
    )
}