import { api } from '../api/api.ts';;
import { PRODUCTS } from '../api/endpoints.ts';

const PRODUCTS_SERVICE = {
    getProducts: async () => {
        const res= await api.get(PRODUCTS.getProducts);
        return res;
    }
}

export { PRODUCTS_SERVICE }