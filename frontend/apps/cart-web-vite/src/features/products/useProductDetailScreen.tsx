import { useEffect, useState } from "react";
import { toCurrency } from "../../utils/helpers";
import { CART } from "../../utils/constants";

const INITIAL_PRODUCT = {
    id: "",
    photo: "",
    name: "",
    price: 0
}

function useProductDetailScreen(id: string) {
    const [product, setProduct] = useState(INITIAL_PRODUCT);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const result = CART.find(item => item.id === id)
        if (result) setProduct(result)
    }, [])

    return {
        product: {
            ...product, 
            quantity,
            price: toCurrency(product.price) 
        },
        priceTotal: toCurrency(product.price * quantity),
        handleAdd: () => alert(`Produto adicionado ao carrinho`),
        handleQuantity: (value: number) => setQuantity(value)
    }
}

export default useProductDetailScreen