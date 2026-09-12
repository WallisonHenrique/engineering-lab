import CartButtom from '../cart-buttom';
import CartItem from '../cart-item';
import MiniCart from '../mini-cart';
import './styles.css';
import Menu from '../menu';
import { useCart } from '@/contexts';

function Header() {
    const { items, totalItems } = useCart()

    return (
        <header className='header'>
            <Menu />
            <div className='mini-cart-wrapper'>
                <CartButtom>{totalItems}</CartButtom>
                <div className='mini-cart-dropdown'>
                    <MiniCart>{items.map(i => (
                        <CartItem product={i} />
                    ))}</MiniCart>
                </div>
            </div>
        </header>
    )
}

export default Header