import { CartProvider } from "@cart-web-vite/shared/providers/cart-provider";

export function AppProvider({ children }: React.PropsWithChildren) {
    return (
        <CartProvider>
            {children}
        </CartProvider>
    )
}