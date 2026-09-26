import { router } from "@/routes";
import { CartProvider } from "@cart-web-vite/checkout/contexts/cart-provider";
import { RouterProvider } from "@tanstack/react-router";
import '@/styles/global.css'

export function App() {
    return (
        <CartProvider>
            <RouterProvider router={router} />
        </CartProvider>
    )
}