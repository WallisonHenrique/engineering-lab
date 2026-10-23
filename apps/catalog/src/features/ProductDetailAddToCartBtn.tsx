import type { CartAction } from "@cart-web-vite/shared/contexts/cart-contexts";
import { useCartDispatch } from "@cart-web-vite/shared/hooks/use-cart";
import type { ProductModel } from "../types/product-types";
import { Button } from "@cart-web-vite/ui/Button";
import { TotalPrice } from "@cart-web-vite/shared/components/TotalPrice";

interface Props {
  quantity: number;
  product: ProductModel;
}

export function ProductDetailAddToCartBtn({ quantity, product }: Props) {
  const dispatch = useCartDispatch();
  const totalPrice = product.price * quantity;

  const handleClick = () => {
    const addItemAction: CartAction = {
      type: "ADD_ITEM",
      payload: { ...product, quantity },
    };
    dispatch(addItemAction);
  };

  return (
    <div className="product-detail__add-to-cart__btn">
      <Button onClick={handleClick}>
        Adicionar
        <TotalPrice value={totalPrice} />
      </Button>
    </div>
  );
}
