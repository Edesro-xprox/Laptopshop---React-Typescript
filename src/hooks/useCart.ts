import { useState, useEffect , useMemo } from 'react'
import type { ProductType } from "../types/ProductType.ts";
import type { CartType, CartItemType } from "../types/CartType.ts";
import { CART_SERVICE } from '../services/cart.service.ts';
import { PRODUCTS_SERVICE } from '../services/laptop.service.ts';

const useCart = () =>{
    type CartProductType = Pick<ProductType,'_id' | 'name' | 'image' | 'description' | 'price'> & { quantity: number };

    const [data, setData] = useState<ProductType[]>([]);
    const [cart, setCart] = useState<CartProductType[]>([]);

    const loadProducts = async () =>{
        const res = await PRODUCTS_SERVICE.getProducts();
        setData(res.data);
    }

    const loadCart = async () => {
        const res = await CART_SERVICE.getCart();
        // res.data debe ser un CartType
        const cartData: CartType = res.data[0];
        const cartWithProductData: CartProductType[] = cartData?.items?.map((item: CartItemType) => {
            const product = data.find(d => d._id === item._id);
            if (product) {
                return {
                    _id: item._id,
                    name: item.name,
                    image: product.image,
                    description: product.description,
                    price: item.price,
                    quantity: item.quantity
                };
            } else {
                return null;
            }
        }).filter((c: CartProductType | null) => c != null) as CartProductType[] || [];
        console.log(cartWithProductData);
        setCart(cartWithProductData);
    }

    useEffect(() =>{
        loadProducts();
    },[])

    useEffect(() =>{
        if(data.length > 0){; // Esperar a que los productos se carguen antes de cargar el carrito{
            loadCart();
        }
    },[data])


    const addToCart = async (product: ProductType) => {
        if(!cart.some(c => c._id == product._id)){
            cart.push({...product, quantity: 1});   
        }else{
            await modifyQuantity(product._id, 1);
            return;
        }
        // Convertir el carrito actual a la estructura CartItemType[]
        const items: CartItemType[] = cart.map(c => ({
            _id: c._id,
            name: c.name,
            price: c.price,
            quantity: c.quantity
        }));

        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const res = await CART_SERVICE.addCart(items, total);
        loadCart();
        return res;
    }

    const removeFromCart = async (id: string) => {
        const res = await CART_SERVICE.deleteCart(id);
        loadCart();
        return res;
    }

    const modifyQuantity = async (id: string, value: number) => {
        const res = await CART_SERVICE.updateQuantityCart(id, value);
        loadCart();
        return res;
    }

    const removeCart = async () => {
        const res = await CART_SERVICE.clearCart();
        loadCart();
        return res;
    }

    const isEmpty = useMemo(() => cart.length == 0,[cart]); 
    // const cartTotal = useMemo(() => cart.reduce((total: number,c: CartType) => total += c.quantity * c.price,0),[cart]);
    const cartTotal = useMemo(() => {
        return cart.reduce((total: number, c: CartProductType) => {
            const product = data.find(d => d._id == c._id);
            if (product) {
                return total + c.quantity * product.price;
            }
            return total;
        }, 0);
    }, [cart]);

    return {
        cart,
        removeCart,
        removeFromCart,
        modifyQuantity,
        data,
        addToCart,
        setCart,
        isEmpty,
        cartTotal
    }
}

export { useCart };