
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

export type { CartType, CartItemType };