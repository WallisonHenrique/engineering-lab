import CartButtom from '../cart-buttom';
import CartItem from '../cart-item';
import MiniCart from '../mini-cart';
import './styles.css';

const PHOTO = "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR1ieevip1Dtt_koA21ZPais5TCTphFsAS8s_Qd0ETjE1D2FZeWWqRS5sqiFM3rzF7U40RvrluU2V3-w7yn1rUfDyi0hBwAB-NgLwwKRkrL2IGolPz8uNqVKg"
const CART = [
    { id: 1, photo: PHOTO, name: "Macbook Pro", price: 8705.21, qtd: 2 },
    { id: 2, photo: PHOTO, name: "Macbook Pro 3", price: 10145.58, qtd: 5 },
    { id: 3, photo: PHOTO, name: "Macbook Pro 2", price: 9157.84, qtd: 1 }
]

function Header() {
    const handleEditCart = (action: string, id: number) => alert(`${action} ${id}`)

    const {count, list} = CART.reduce<{
        count: number
        list: React.ReactElement[]
    }>((acc, item) => {
        const cartItem = (
            <CartItem
                product={item}
                onClick={handleEditCart}
            />
        )

        return {
            count: acc.count + item.qtd,
            list: [...acc.list, cartItem]
        }
    }, {count: 0, list: []})

    return (
        <header className='header'>
            <div className='mini-cart-wrapper'>
                <CartButtom>{count}</CartButtom>
                <div className='mini-cart-dropdown'>
                    <MiniCart>{list}</MiniCart>
                </div>
            </div>
        </header>
    )
}

export default Header