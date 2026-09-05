import "./styles.css"

interface Props {
    product: {
        id: number
        photo: string
        name: string
        price: number
        qtd: number
    }
    onClick: (action: string, id: number) => void
}

function CartItem({product, onClick}: Props) {
    return (
        <li className="cart-item">
            <div className="cart-item-photo">
                <img 
                    src={product.photo}
                    alt={product.name}
                />
            </div>
            <div className="cart-item-name">{product.name}</div>
            <div className="cart-item-price">R$ {product.price}</div>
            <div className="cart-item-counter">
                <button 
                    className="cart-item-controls"
                    type="button"
                    onClick={() => onClick("decrease", product.id)}
                >
                    -
                </button>
                <span className="cart-item-qtd">{product.qtd}</span>
                <button 
                    className="cart-item-controls"
                    type="button"
                    onClick={() => onClick("increase", product.id)}
                >
                    +
                </button>
            </div>
        </li>
    )
}

export default CartItem