import { useCartDispatch } from "@cart-web-vite/shared/hooks/use-cart"
import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

const CART_ACTIONS_TYPES = ['ADD_ITEM', 'REMOVE_ITEM', 'CHANGE_QUANTITY']

export function useCartIframeListener({senderOrigin}: {senderOrigin: string}) {
    const dispatch = useCartDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== senderOrigin) return;

            if (CART_ACTIONS_TYPES.includes(event.data.type)) {
                dispatch(event.data)
            }
            
            if (event.data.type === 'REDIRECT_TO_CART') {
                navigate({ to: event.data.path })
            }
        }

        window.addEventListener('message', handleMessage)

        return () => window.removeEventListener('message', handleMessage)
    }, [navigate])
}