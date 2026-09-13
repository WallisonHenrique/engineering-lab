import CartButtom from '../cart-buttom';
import CartItem from '../cart-item';
import MiniCart from '../mini-cart';
import './styles.css';
import Menu from '../menu';
import { useCart } from '@/contexts';
import { Button } from '@/components/Button';
import { Link } from '@tanstack/react-router';
import { TotalPrice } from '@/components/TotalPrice';

function HeaderMiniCart() {
    const cart = useCart()

    return (
        <div className='header__mini-cart'>
            <CartButtom>{cart.totalItems}</CartButtom>
            <div className='mini-cart-dropdown'>
                <MiniCart>
                    { cart.items.map(i => (
                            <CartItem key={i.id} product={i} />
                    ))}
                    <div className="mini-cart__view-cart">
                        <div className="mini-cart__total-price">
                            Total
                            <TotalPrice value={cart.totalPrice} />
                        </div>
                        <Link to="/carrinho">
                            <Button>Ver Carrinho</Button>
                        </Link>
                    </div>
                </MiniCart>
            </div>
        </div>
    )
}

export function Header() {
    return (
        <header className='header'>
            <div className="header__menu">
                <Menu />
            </div>
            <HeaderMiniCart />
        </header>
    )
}