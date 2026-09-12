import type { CartItemModel } from "@/types";
import { createContext, useContext, useReducer } from "react";

type CartAction =
    | { type: "ADD_ITEM", payload: CartItemModel }
    | { type: "REMOVE_ITEM", id: string }
    | { type: "CHANGE_QUANTITY", id: string, quantity: number }

interface CartState {
    items: CartItemModel[]
}

interface CartContextValue extends CartState {
    totalItems: number
    totalPrice: number
}

const CartContext = createContext<CartContextValue | null>(null)
const CartDispatchContext = createContext<React.ActionDispatch<[action: CartAction]> | null>(null)

const initialCartState = {
    items: []
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, dispatch] = useReducer(cartReducer, initialCartState)

    const totals = cart.items.reduce((acc, current) => ({
            totalItems: acc.totalItems + current.quantity,
            totalPrice: acc.totalPrice + (current.quantity * current.price)
        }), { totalItems: 0, totalPrice: 0 })
    
    return (
        <CartContext value={{...cart, ...totals}}>
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

    const getItem = ({ id }: { id: string }) => {
        return context.items.find(i => i.id === id) || null
    }

    return { ...context, getItem }
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
                items: [...cart.items, {
                    id: action.payload.id,
                    image: action.payload.image,
                    name: action.payload.name,
                    price: action.payload.price,
                    quantity: action.payload.quantity
                }]
            }
        }
        case 'CHANGE_QUANTITY': {
            return {
                items: cart.items.map(i => {
                    if (i.id === action.id) {
                        return {...i, 
                            quantity: action.quantity
                        }
                    }
                    return i
                })
            }
        }
        case 'REMOVE_ITEM': {
            return {
                items: cart.items.filter(i => i.id !== action.id)
            }
        }
        default: {
            throw Error('Unknow action')
        }
    }
}