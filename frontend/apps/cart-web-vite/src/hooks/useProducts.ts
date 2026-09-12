import { useEffect, useState } from "react";
import type { ProductModel } from "@/types";
import { CART } from "@/utils";

export function useProducts() {
    const [products, setProducts] = useState<ProductModel[] | null>(null);

    useEffect(() => {
        setProducts(CART)
    }, [])

    return { products }
}