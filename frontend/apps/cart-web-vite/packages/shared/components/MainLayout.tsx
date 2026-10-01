import { Header } from "@cart-web-vite/shared/components/Header"
import "./MainLayout.css"
import Menu from "@cart-web-vite/shared/components/Menu"
import { MenuItemModel } from "@cart-web-vite/shared/types/menu-types"

interface MainLayoutProps {
    menuItems: MenuItemModel[], 
    children: React.ReactNode
}

function MainLayout({menuItems, children}: MainLayoutProps) {
    return (
        <div className="main-layout">
            <Header>
                <Menu items={menuItems} />
            </Header>
            <main className="content">{children}</main>
        </div>
    )
}

export default MainLayout