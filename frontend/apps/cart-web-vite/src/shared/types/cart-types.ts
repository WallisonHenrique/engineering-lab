import type { ProductModel } from "@/modules/catalog/types/product-types";

export interface CartItemModel extends ProductModel {
    quantity: number
}