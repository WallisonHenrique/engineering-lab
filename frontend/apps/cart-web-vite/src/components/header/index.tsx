import CartButtom from '../cart-buttom';
import CartItem from '../cart-item';
import MiniCart from '../mini-cart';
import './styles.css';
import Menu from '../menu';
import { useCart, useCartDispatch } from '@/contexts';

function Header() {
    const { items, totalItems } = useCart()
    const dispatch = useCartDispatch()

    const handleEditCart = ({ id, value}: { id: string, value: number}) => {
        dispatch({ type: "CHANGE_QUANTITY", id, quantity: value })
    }

    return (
        <header className='header'>
            <Menu />
            <div className='mini-cart-wrapper'>
                <CartButtom>{totalItems}</CartButtom>
                <div className='mini-cart-dropdown'>
                    <MiniCart>{items.map(i => (
                        <CartItem
                            product={i}
                            onClick={handleEditCart}
                        />
                    ))}</MiniCart>
                </div>
            </div>
        </header>
    )
}

export default Header