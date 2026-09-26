import { Link } from "@tanstack/react-router"
import "./Menu.css"
import type { MenuItemModel } from "@cart-web-vite/shared/types/menu-types";
import { catalogMenuItems } from '@cart-web-vite/catalog/menu'
import { checkoutMenuItems } from '@cart-web-vite/checkout/menu'

const navigationMenu: MenuItemModel[] = [
    ...catalogMenuItems,
    ...checkoutMenuItems
];

function Menu() {
    return (
        <nav className="menu">
            {navigationMenu.map(i => <Link key={i.path} className="menu-link" to={i.path}>{i.label}</Link>)}
        </nav>
    )
}

export default Menu