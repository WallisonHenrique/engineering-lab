import { toCurrency } from "@/utils/helpers"

interface TotalPriceProps {
    value: number
}

export function TotalPrice({ value }: TotalPriceProps) {
    return <div className="total-price">{toCurrency(value)}</div>
}