import { CART } from '../api/endpoints.ts';
import { api } from '../api/api.ts';
import type { CartType, CartItemType } from '../types/CartType';

const CART_SERVICE = {
    getCart: async () => {
        const res = await api.get(CART.getCart);
        return res;
    },
    findCartByUserId: async (userId: string) => {
        const res = await api.get(CART.findCartByUserId(userId));
        return res;
    },
    addCart: async (cartId: string, userId: string, items: CartItemType[], total: number) => {
        // Enviar la estructura completa del carrito
        const cart: CartType = {
            _id: cartId,
            userId,
            items,
            total
        };
        const res = await api.post(CART.addCart(), cart);
        return res;
    },
    deleteCart: async (cartId: string, userId: string, id: string) => {
        // Eliminar un item del carrito (por id de producto)
        const res = await api.delete(CART.deleteCart(id), { data: { cartId: cartId, userId: userId } });
        return res;
    },
    updateQuantityCart: async (cartId: string, userId: string, id: string, value: number) => {
        // Actualizar cantidad de un item
        const res = await api.put(CART.updateQuantityCart(id, value), { cartId: cartId, userId: userId });
        return res;
    },
    clearCart: async (cartId: string, userId: string) => {
        // Limpiar el carrito completo
        const res = await api.delete(CART.clearCart, { data: { cartId: cartId, userId: userId } });
        return res;
    }
};

export { CART_SERVICE };