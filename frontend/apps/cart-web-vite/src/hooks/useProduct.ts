import { useEffect, useState } from "react";
import type { ProductModel } from "@/types";
import { CART } from "@/utils";

interface UseProductProps {
    id: string
}

export function useProduct({ id }: UseProductProps) {
    const [product, setProduct] = useState<ProductModel | null>(null);

    useEffect(() => {
        const result = CART.find(item => item.id === id)
        if (result) setProduct(result)
    }, [])

    return { product }
}