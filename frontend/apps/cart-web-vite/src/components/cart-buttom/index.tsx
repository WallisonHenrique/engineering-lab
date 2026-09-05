import "./styles.css"

function CartButtom({...props}) {
    return (
        <button className="cart-buttom" type="button">
            &#128722;
            <span className="cart-buttom-count">{props.children}</span>
        </button>
    )
}

export default CartButtom