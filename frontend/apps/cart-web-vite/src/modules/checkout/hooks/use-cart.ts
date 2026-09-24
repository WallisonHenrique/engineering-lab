import { CartContext, CartDispatchContext } from "@/contexts/cart-contexts";
import { useContext } from "react";

export function useCart() {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error('useCart must be used within a CartProvider.');
    }

    return context
}

export function useCartTotalItems() {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error('useCartTotalItems must be used within a CartProvider.');
    }

    return context.allIds.reduce((acc, id) => 
        acc + context.byId[id].quantity, 0)
}

export function useCartTotalPrice() {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error('useCartTotalPrice must be used within a CartProvider.');
    }

    return context.allIds.reduce((acc, id) => {
        const current = context.byId[id]
        return acc + current.price * current.quantity
    }, 0)
}

export function useCartDispatch() {
    const context = useContext(CartDispatchContext)

    if (!context) {
        throw new Error('useCartDispatch must be used within a CartProvider.');
    }

    return context
}