import { Link } from "@tanstack/react-router"
import "./Menu.css"
import type { MenuItemModel } from "@/shared/types/menu-types";
import { catalogMenuItems } from '@/modules/catalog'
import { checkoutMenuItems } from '@/modules/checkout'

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