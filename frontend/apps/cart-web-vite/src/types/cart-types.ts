import type { ProductModel } from "@/types/product-types";

export interface CartItemModel extends ProductModel {
    quantity: number
}