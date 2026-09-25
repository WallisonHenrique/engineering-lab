import { router } from "@/app-shell/routes";
import { CartProvider } from "@/modules/checkout/contexts/cart-provider";
import { RouterProvider } from "@tanstack/react-router";
import '@/app-shell/styles/global.css'

export function App() {
    return (
        <CartProvider>
            <RouterProvider router={router} />
        </CartProvider>
    )
}