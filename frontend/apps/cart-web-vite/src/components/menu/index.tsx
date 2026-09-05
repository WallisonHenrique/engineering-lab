import { Link } from "@tanstack/react-router"
import "./styles.css"

function Menu() {
    return (
        <nav className="menu">
            <Link className="menu-link" to="/">Início</Link>
            <Link className="menu-link" to="/carrinho">Carrinho</Link>
        </nav>
    )
}

export default Menu