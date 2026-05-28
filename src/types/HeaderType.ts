import type { CartProductType } from "./CartType.ts";

interface HeaderProps{
    cart: CartProductType[];
    removeFromCart: (id: string) => void;
    modifyQuantity: (id: string, value: number) => void;
    removeCart: () => void;
    isEmpty: boolean;
    cartTotal: number;
    loadProducts: (type: string) => void;
    select: string;
    handleSelect: (type: string) => void;
}

export type { HeaderProps }