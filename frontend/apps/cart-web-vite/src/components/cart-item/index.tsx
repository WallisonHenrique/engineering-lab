import NumberField from "@/components/NumberField"
import "./styles.css"
import { useCartDispatch } from "@/contexts"

interface Props {
    product: {
        id: string
        image: string
        name: string
        price: number
        quantity: number
    }
}

function CartItem({product}: Props) {
    const dispatch = useCartDispatch()

    const handleEditCart = (value: number) => {
        dispatch({ type: "CHANGE_QUANTITY", id: product.id, quantity: value })
    }

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
                <NumberField 
                    value={product.quantity} 
                    min={1} 
                    onChange={handleEditCart} 
                />
            </div>
        </li>
    )
}

export default CartItem