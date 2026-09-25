import './Header.css';
import Menu from '@/app-shell/components/Menu';
import { MiniCart } from '@/modules/checkout/features/MiniCart';

export function Header() {
    return (
        <header className='header'>
            <div className="header__left">
                <Menu />
            </div>
            <div className='header__right'>
                <MiniCart />
            </div>
        </header>
    )
}