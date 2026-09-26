import { toCurrency } from "@cart-web-vite/shared/src/utils/helpers"

export function TotalPrice({ value }: { value: number }) {
    return <div className="total-price">{toCurrency(value)}</div>
}