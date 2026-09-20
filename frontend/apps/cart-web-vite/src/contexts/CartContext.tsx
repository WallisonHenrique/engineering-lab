import type { CartItemModel } from "@/types";
import { createContext, useContext, useReducer } from "react";

type CartAction =
    | { type: "ADD_ITEM", payload: CartItemModel }
    | { type: "REMOVE_ITEM", id: string }
    | { type: "CHANGE_QUANTITY", id: string, quantity: number }

export interface CartState {
    byId: Record<string, CartItemModel>
    allIds: string[]
}

const CartContext = createContext<CartState | null>(null)
const CartDispatchContext = createContext<React.ActionDispatch<[action: CartAction]> | null>(null)

const initialCartState = {
    byId: {},
    allIds: []
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, dispatch] = useReducer(cartReducer, initialCartState)

    const cartContextValue = {...cart}

    return (
        <CartContext value={cartContextValue}>
            <CartDispatchContext value={dispatch}>
                {children}
            </CartDispatchContext>
        </CartContext>
    )
}

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

    return context.allIds.reduce((acc, current) => 
        acc + context.byId[current].quantity, 0)
}

export function useCartTotalPrice() {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error('useCartTotalPrice must be used within a CartProvider.');
    }

    return context.allIds.reduce((acc, current) => 
        acc + context.byId[current].price, 0)
}

export function useCartDispatch() {
    const context = useContext(CartDispatchContext)

    if (!context) {
        throw new Error('useCartDispatch must be used within a CartProvider.');
    }

    return context
}

function cartReducer(cart: CartState, action: CartAction) {
    switch (action.type) {
        case 'ADD_ITEM': {
            return { 
                byId: {...cart.byId, [action.payload.id]: action.payload},
                allIds: [...cart.allIds, action.payload.id]
            }
        }
        case 'CHANGE_QUANTITY': {
            return {
                ...cart,
                byId: { 
                    ...cart.byId, 
                    [action.id]: { 
                        ...cart.byId[action.id], 
                        quantity: action.quantity 
                    }
                }
            }
        }
        case 'REMOVE_ITEM': {
            const {[action.id]: removed, ...rest} = cart.byId
            return {
                byId: rest,
                allIds: cart.allIds.filter(i => i !== action.id)
            }
        }
        default: {
            throw Error('Unknow action')
        }
    }
}