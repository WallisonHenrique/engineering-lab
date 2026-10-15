import { Link } from "@tanstack/react-router"
import "./Menu.css"
import type { MenuItemModel } from "@cart-web-vite/shared/types/menu-types";

function Menu({ items }: { items: MenuItemModel[]}) {
    return (
        <nav className="menu">
            {items.map(i => (
                i.path.includes('http://')
                    ? <a key={i.path} className="menu-link" href={i.path}>{i.label}</a>
                    : <Link key={i.path} className="menu-link" to={i.path}>{i.label}</Link>
            ))}
        </nav>
    )
}

export default Menu