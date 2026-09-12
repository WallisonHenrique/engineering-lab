import "./styles.css"

interface Props {
    product: {
        id: string
        image: string
        name: string
        price: number
        quantity: number
    }
    onClick: ({ id, value}: { id: string, value: number}) => void
}

function CartItem({product, onClick}: Props) {
    return (
        <li className="cart-item">
            <div className="cart-item-photo">
                <img 
                    src={product.image}
                    alt={product.name}
                />
            </div>
            <div className="cart-item-name">{product.name}</div>
            <div className="cart-item-price">R$ {product.price}</div>
            <div className="cart-item-counter">
                <button 
                    className="cart-item-controls"
                    type="button"
                    onClick={() => onClick({id: product.id, value: product.quantity - 1})}
                >
                    -
                </button>
                <span className="cart-item-qtd">{product.quantity}</span>
                <button 
                    className="cart-item-controls"
                    type="button"
                    onClick={() => onClick({id: product.id, value: product.quantity + 1})}
                >
                    +
                </button>
            </div>
        </li>
    )
}

export default CartItem