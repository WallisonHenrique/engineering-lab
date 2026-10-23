import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProductDetailAddToCart } from "./ProductDetailAddToCart";
import type { ProductModel } from "../types/product-types";
import userEvent from "@testing-library/user-event";

const mockDispatch = vi.fn();
const mockProduct: ProductModel = {
  id: "macbook-pro-1",
  image: "https://macbook.com",
  name: "Macbook Pro",
  price: 10,
};

vi.mock("@cart-web-vite/shared/hooks/use-cart", () => ({
  useCartDispatch: () => mockDispatch,
}));

describe("ProductDetailAddToCart", () => {
  it("should starts with quantity 1", async () => {
    render(<ProductDetailAddToCart product={mockProduct} />);
    const textbox = screen.getByRole("textbox") as HTMLInputElement;
    expect(textbox.value).toBe("1");
  });

  it("should forces the minimum value to 1", async () => {
    render(<ProductDetailAddToCart product={mockProduct} />);
    const user = userEvent.setup();
    const textbox = screen.getByRole("textbox") as HTMLInputElement;
    await user.clear(textbox);
    expect(textbox.value).toBe("1");
  });
});
