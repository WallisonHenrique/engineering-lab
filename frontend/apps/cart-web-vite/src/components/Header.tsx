import { MiniCart } from '@/features/MiniCart';
import './Header.css';
import { useState } from 'react';
import Menu from '@/components/Menu';
import { useCartTotalItems } from '@/hooks/use-cart';

function HeaderMinitCartBtn({ onClick }: { onClick: () => void }) {
    const total = useCartTotalItems()
    return (
        <button className="header__mini-cart__btn" onClick={onClick}>
            &#128722;
            {total > 0 && <span className="header__mini-cart__badge">{total}</span>}
        </button>
    )
}

function HeaderMinitCart() {
    const [open, setOpen] = useState(false)
    return (
        <div className="header__mini-cart">
            <HeaderMinitCartBtn onClick={() => setOpen(prev => !prev)}/>
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