import './Header.css';
import { useCartTotalItems } from '@cart-web-vite/shared/hooks/use-cart';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

function HeaderMiniCartButton({ onClick }: { onClick: () => void }) {
    const total = useCartTotalItems()

    return (
        <button className="header__mini-cart__btn" onClick={onClick}>
            &#128722;
            {total > 0 && <span className="header__mini-cart__badge">{total}</span>}
        </button>
    )
}

function HeaderMiniCartDropdown({open}: {open: boolean}) {
    const iframeRef = useRef<HTMLIFrameElement|null>(null)
    const handleOnLoad = () => {
        window.__MINI_CART_WINDOW__ = iframeRef?.current?.contentWindow
    }

    useEffect(() => {
        return () => {
            window.__MINI_CART_WINDOW__ = undefined
        }
    }, [])

    return (
        <div className="header__mini-cart__dropdown">
            <iframe
                ref={iframeRef}
                src="http://localhost:5173/mini-carrinho"
                width={440} 
                height={464}
                style={{display: open ? 'block' : 'none'}}
                onLoad={handleOnLoad}
            />
        </div>
    )
} 

function HeaderMiniCart() {
    const [open, setOpen] = useState(false)

    return (
        <div className="header__mini-cart">
            <HeaderMiniCartButton onClick={() => setOpen(prev => !prev)}/>
            <HeaderMiniCartDropdown open={open} />
        </div>
    )
}

export function Header({children}: PropsWithChildren) {
    return (
        <header className='header'>
            <div className="header__left">
                {children}
            </div>
            <div className='header__right'>
                <HeaderMiniCart />
            </div>
        </header>
    )
}