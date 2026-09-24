import { CART } from "@/utils/constants";

export function useProduct({ id }: { id: string }) {
    return { product: CART.find(item => item.id === id) }
}