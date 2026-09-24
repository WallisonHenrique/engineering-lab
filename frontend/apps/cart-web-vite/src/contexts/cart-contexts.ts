import type { CartItemModel } from "@/types"
import { createContext } from "react"

export interface CartState {
    byId: Record<string, CartItemModel>
    allIds: string[]
}

export type CartAction =
    | { type: "ADD_ITEM", payload: CartItemModel }
    | { type: "REMOVE_ITEM", id: string }
    | { type: "CHANGE_QUANTITY", id: string, quantity: number }

export const CartContext = createContext<CartState | null>(null)
export const CartDispatchContext = createContext<React.ActionDispatch<[action: CartAction]> | null>(null)