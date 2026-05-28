import type { ProductType } from "./ProductType";

type CartItemType = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
};

type CartType = {
    _id: string;
    userId: string;
    items: CartItemType[];
    total: number;
};

type CartProductType = Pick<ProductType,'_id' | 'name' | 'image' | 'price'> & { quantity: number };

export type { CartType, CartItemType, CartProductType };