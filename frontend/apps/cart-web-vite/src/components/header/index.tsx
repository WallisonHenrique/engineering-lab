import CartButtom from '../cart-buttom';
import CartItem from '../cart-item';
import MiniCart from '../mini-cart';
import './styles.css';
import Menu from '../menu';
import { useCart } from '@/contexts';

const PHOTO = "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR1ieevip1Dtt_koA21ZPais5TCTphFsAS8s_Qd0ETjE1D2FZeWWqRS5sqiFM3rzF7U40RvrluU2V3-w7yn1rUfDyi0hBwAB-NgLwwKRkrL2IGolPz8uNqVKg"
const CART = [
    { id: 1, photo: PHOTO, name: "Macbook Pro", price: 8705.21, qtd: 2 },
    { id: 2, photo: PHOTO, name: "Macbook Pro 3", price: 10145.58, qtd: 5 },
    { id: 3, photo: PHOTO, name: "Macbook Pro 2", price: 9157.84, qtd: 1 }
]

function Header() {
    const { totalItems } = useCart()
    const handleEditCart = (action: string, id: number) => alert(`${action} ${id}`)

    const { list } = CART.reduce<{
        list: React.ReactElement[]
    }>((acc, current) => {
        const cartItem = (
            <CartItem
                product={current}
                onClick={handleEditCart}
            />
        )

        return {
            list: [...acc.list, cartItem]
        }
    }, {list: []})

    return (
        <header className='header'>
            <Menu />
            <div className='mini-cart-wrapper'>
                <CartButtom>{totalItems}</CartButtom>
                <div className='mini-cart-dropdown'>
                    <MiniCart>{list}</MiniCart>
                </div>
            </div>
        </header>
    )
}

export default Header