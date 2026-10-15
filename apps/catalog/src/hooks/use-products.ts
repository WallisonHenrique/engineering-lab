import { PRODUCTS } from "../utils/products-data"

export function useProduct({ id }: { id: string }) {
    return { product: PRODUCTS.find(item => item.id === id) }
}

export function useProducts() {
    return { products: PRODUCTS }
}