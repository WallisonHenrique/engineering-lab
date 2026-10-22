import type { MenuItemModel } from "@cart-web-vite/shared/types/menu-types";
import { Header } from "./Header";
import Menu from "./Menu";
import "./MainLayout.css";

interface MainLayoutProps {
  menuItems: MenuItemModel[];
  children: React.ReactNode;
}

function MainLayout({ menuItems, children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <Header>
        <Menu items={menuItems} />
      </Header>
      <main className="content">{children}</main>
    </div>
  );
}

export default MainLayout;
