import { CartContext, CartDispatchContext, type CartAction, type CartState } from "@/shared/contexts/cart-contexts";
import { useReducer } from "react";

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
            const {[action.id]: _removed, ...rest} = cart.byId
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