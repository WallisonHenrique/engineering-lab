import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProductDetailAddToCartBtn } from "./ProductDetailAddToCartBtn";
import type { ProductModel } from "../types/product-types";

const mockDispatch = vi.fn();

vi.mock("@cart-web-vite/shared/hooks/use-cart", () => ({
  useCartDispatch: () => mockDispatch,
}));

describe("ProductDetailAddToCartBtn", () => {
  const mockProduct: ProductModel = {
    id: "macbook-pro-1",
    image: "https://macbook.com",
    name: "Macbook Pro",
    price: 10,
  };
  const mockQtd = 3;

  it("should dispatches the correct cart action when the button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ProductDetailAddToCartBtn product={mockProduct} quantity={mockQtd} />,
    );

    const button = screen.getByRole("button", { name: /adicionar.*r\$.*30/i });

    await user.click(button);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_ITEM",
      payload: { ...mockProduct, quantity: mockQtd },
    });
  });
});
