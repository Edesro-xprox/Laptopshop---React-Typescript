import { CART } from '../api/endpoints.ts';
import { api } from '../api/api.ts';
import type { CartType, CartItemType } from '../types/CartType';

const FIXED_CART_ID = 'cart_001';
const FIXED_USER_ID = 'user_123';

const CART_SERVICE = {
    getCart: async () => {
        const res = await api.get(CART.getCart);
        return res;
    },
    addCart: async (items: CartItemType[], total: number) => {
        // Enviar la estructura completa del carrito
        const cart: CartType = {
            _id: FIXED_CART_ID,
            userId: FIXED_USER_ID,
            items,
            total
        };
        const res = await api.post(CART.addCart(), cart);
        return res;
    },
    deleteCart: async (id: string) => {
        // Eliminar un item del carrito (por id de producto)
        const res = await api.delete(CART.deleteCart(id), { data: { cartId: FIXED_CART_ID, userId: FIXED_USER_ID } });
        return res;
    },
    updateQuantityCart: async (id: string, value: number) => {
        // Actualizar cantidad de un item
        const res = await api.put(CART.updateQuantityCart(id, value), { cartId: FIXED_CART_ID, userId: FIXED_USER_ID });
        return res;
    },
    clearCart: async () => {
        // Limpiar el carrito completo
        const res = await api.delete(CART.clearCart, { data: { cartId: FIXED_CART_ID, userId: FIXED_USER_ID } });
        return res;
    }
};

export { CART_SERVICE };