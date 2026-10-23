import { describe, expect, it } from "vitest";
import { calculateTotalPrice } from "./calculate-total-price";

describe("calculateTotalPrice", () => {
  it("should returns the total price for the given unit price and quantity", () => {
    const unitPrice = 10;
    const quantity = 3;
    const expectedTotalPrice = 30;

    const totalPrice = calculateTotalPrice(unitPrice, quantity);

    expect(totalPrice).toBe(expectedTotalPrice);
  });
});
