import { catalogMenuItems } from "@cart-web-vite/catalog/menu";
import type { MenuItemModel } from "@cart-web-vite/shared/types/menu-types";

export const MENU_ITEMS: MenuItemModel[] = [
    ...catalogMenuItems,
    {label: 'Carrinho', path: `${import.meta.env.VITE_CHECKOUT_ORIGIN}/carrinho`},
];