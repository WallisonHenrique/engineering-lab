import { Link } from "@tanstack/react-router"
import "./Menu.css"

function Menu() {
    return (
        <nav className="menu">
            <Link className="menu-link" to="/">Início</Link>
            <Link className="menu-link" to="/carrinho">Carrinho</Link>
        </nav>
    )
}

export default Menu