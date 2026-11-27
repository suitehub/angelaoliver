import { describe, expect, it } from "vitest";
import { cartSubtotal } from "@/components/store/cart";
import { products } from "@/components/store/data";

describe("cartSubtotal", () => {
  it("sums price times quantity", () => {
    expect(cartSubtotal([{ product: products[0]!, qty: 2 }, { product: products[4]!, qty: 1 }])).toBe(144.7);
  });
});
