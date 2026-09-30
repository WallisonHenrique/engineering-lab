import { useCartDispatch } from "@cart-web-vite/shared/hooks/use-cart"
import { useEffect } from "react"

export function useCartIframeListener({senderOrigin}: {senderOrigin: string}) {
    const dispatch = useCartDispatch()

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== senderOrigin) return;
            if (
                event.data.type !== 'ADD_ITEM' &&
                event.data.type !== 'REMOVE_ITEM' &&
                event.data.type !== 'CHANGE_QUANTITY'
            ) return
            dispatch(event.data)
        }

        window.addEventListener('message', handleMessage)

        return () => window.removeEventListener('message', handleMessage)
    }, [])
}