import { toCurrency } from "@/utils/helpers"

export function TotalPrice({ value }: { value: number }) {
    return <div className="total-price">{toCurrency(value)}</div>
}