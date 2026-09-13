import { useCart } from '@/contexts';
import { MiniCart } from '@/features/MiniCart';
import './Header.css';
import { useState } from 'react';
import Menu from '@/components/menu';

function HeaderMinitCartBtn({ onClick }: { onClick: () => void }) {
    const cart = useCart()

    return (
        <button className="header__mini-cart__btn" onClick={onClick}>
            &#128722;
            <span className="header__mini-cart__badge">{cart.totalItems}</span>
        </button>
    )
}

function HeaderMinitCart() {
    const [open, setOpen] = useState(false)

    return (
        <div className="header__mini-cart">
            <HeaderMinitCartBtn onClick={() => setOpen(true)}/>
            <div className='header__mini-cart__dropdown'>
                {open && <MiniCart />}
            </div>
        </div>
    )
}

export function Header() {
    return (
        <header className='header'>
            <div className="header__left">
                <Menu />
            </div>
            <div className='header__right'>
                <HeaderMinitCart />
            </div>
        </header>
    )
}