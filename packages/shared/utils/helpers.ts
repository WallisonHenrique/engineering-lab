import { CartAction } from "@cart-web-vite/shared/contexts/cart-contexts"

export interface DispatchCartIframe {
    targetWindow: Window|undefined|null,
    targetOrigin: string
}

type RedirectToCart = {
    type: 'REDIRECT_TO_CART'
    path: string
}

const REAL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

export function toCurrency(value: number) {
    return REAL.format(value)
}

export function dispatchCartIframe({targetWindow, targetOrigin}: DispatchCartIframe) {
    return (message: CartAction|RedirectToCart) => {
        if (targetWindow) {
            targetWindow.postMessage(message, targetOrigin)
        }
    }
}