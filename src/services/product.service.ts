import { api } from '../api/api.ts';;
import { PRODUCTS } from '../api/endpoints.ts';

const PRODUCTS_SERVICE = {
    getProducts: async (type: string) => {
        const res= await api.get(`${PRODUCTS.getProducts(type)}`);
        return res;
    }
}

export { PRODUCTS_SERVICE }