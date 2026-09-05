import "./styles.css"

function MiniCart({...props}) {
    return <ul className="mini-cart">{props.children}</ul>
}

export default MiniCart