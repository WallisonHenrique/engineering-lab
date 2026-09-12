import type { ProductModel } from "@/types/product";

export interface CartItemModel extends ProductModel {
    quantity: number
}