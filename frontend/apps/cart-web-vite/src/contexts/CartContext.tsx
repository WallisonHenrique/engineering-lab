import type { CartItemModel } from "@/types";
import { createContext, useContext, useMemo, useReducer } from "react";

type CartAction =
    | { type: "ADD_ITEM", payload: CartItemModel }
    | { type: "REMOVE_ITEM", id: string }
    | { type: "CHANGE_QUANTITY", id: string, quantity: number }

export interface CartState {
    itemsById: Record<string, CartItemModel>
    itemsIds: string[]
}

interface CartContextValue extends CartState {
    totalItems: number
    totalPrice: number
}

const CartStateContext = createContext<CartContextValue | null>(null)
const CartDispatchContext = createContext<React.ActionDispatch<[action: CartAction]> | null>(null)

const initialCartState = {
    itemsById: {},
    itemsIds: []
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, dispatch] = useReducer(cartReducer, initialCartState)

    const totals = cart.itemsIds.reduce((acc, id) => {
        const current = cart.itemsById[id];
        return {
            totalItems: acc.totalItems + current.quantity,
            totalPrice: acc.totalPrice + (current.quantity * current.price)
        };
    }, { totalItems: 0, totalPrice: 0 })

    const cartContextValue = useMemo(() => ({...totals, ...cart}), [cart])
    
    return (
        <CartStateContext value={cartContextValue}>
            <CartDispatchContext value={dispatch}>
                {children}
            </CartDispatchContext>    
        </CartStateContext>
    )
}

export function useCart(id?: string) {
    const context = useContext(CartStateContext)

    if (!context) throw new Error('useCart must be used within a CartProvider.')

    return { 
        totalItems: context.totalItems,
        totalPrice: context.totalPrice,
        item: context.itemsById[id || ''],
        itemsIds: context.itemsIds
     }
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
                itemsById: { ...cart.itemsById, [action.payload.id]: action.payload },
                itemsIds: [ ...cart.itemsIds, action.payload.id ]
            }
        }
        case 'CHANGE_QUANTITY': {
            return {
                ...cart,
                itemsById: {
                    ...cart.itemsById,
                    [action.id]: {
                        ...cart.itemsById[action.id],
                        quantity: action.quantity
                    }
                }
            }
        }
        case 'REMOVE_ITEM': {
            const { [action.id]: removedItem, ...rest } = cart.itemsById
            return {
                itemsById: rest,
                itemsIds: cart.itemsIds.filter(i => i !== action.id)
            }
        }
        default: {
            throw Error('Unknow action')
        }
    }
}