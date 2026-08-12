import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CartContextType } from '../types/CartType.ts';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const cartCurrent = JSON.stringify(localStorage.getItem('cartId'));
    const [cartId, setCartId] = useState<string>(cartCurrent);

    const getCartId = (id: string) => {
        setCartId(id);
    }

    return(
        <CartContext.Provider value={{ cartId, getCartId }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartInfo = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCartInfo must be used within a CartProvider');
    }
    return context;
};