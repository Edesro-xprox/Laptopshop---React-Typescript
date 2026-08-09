import { useState, useEffect , useMemo } from 'react'
import type { ProductType } from "../types/ProductType.ts";
import type { CartType, CartItemType, CartProductType } from "../types/CartType.ts";
import { CART_SERVICE } from '../services/cart.service.ts';
import { PRODUCTS_SERVICE } from '../services/product.service.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { useCartInfo } from '../context/CartContext.tsx';

const useCart = () =>{    
    const [all, setAll] = useState<ProductType[]>([]);
    const [data, setData] = useState<ProductType[]>([]);
    const [cart, setCart] = useState<CartProductType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [select, setSelect] = useState('laptop');
    const { user } = useAuth();
    const { cartId } = useCartInfo();

    const handleSelect = (type: string) =>{
        setSelect(type);
    }

    const loadAllProducts = async () =>{
        const res = await PRODUCTS_SERVICE.getAllProducts();
        setAll(res.data);
    }

    const loadProducts = async (type: string) =>{
        setLoading(true);
        try {
            const res = await PRODUCTS_SERVICE.getProducts(type);
            setData(res.data);
        } finally {
            setLoading(false);
        }
    }

    const loadCart = async () => {
        const res = await CART_SERVICE.getCart();
        // res.data debe ser un CartType
        const cartData: CartType = res.data.filter((c: CartType) => c.userId == user?._id)[0];
        const cartWithProductData: CartProductType[] = cartData?.items?.map((item: CartItemType) => {
            const product = all.find(d => d._id === item._id);
            if (product) {
                return {
                    _id: item._id,
                    name: item.name,
                    image: product.image,
                    type: product.type,
                    price: item.price,
                    quantity: item.quantity
                };
            } else {
                return null;
            }
        }).filter((c: CartProductType | null) => c != null) as CartProductType[] || [];
        setCart(cartWithProductData);
    }

    useEffect(() =>{
        loadAllProducts();
        loadProducts('laptop');
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

        // Calcular el total del carrito
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Generar el nuevo id del carrito
        const carts = await CART_SERVICE.getCart();
        debugger
        let cartIdCurrent = null, lastId = null;

        if(carts.data.length > 0 && !Boolean(cartIdCurrent)){
            lastId = carts.data.map((c: CartType) => c._id).at(-1);
            cartIdCurrent = `cart_${String(Number(lastId.split('_')[1]) + 1).padStart(3, '0')}`;
        }else{
            cartIdCurrent = 'cart_001';
        }


        const res = await CART_SERVICE.addCart(cartId || cartIdCurrent, user?._id!, items, total);
        loadCart();
        return res;
    }

    const removeFromCart = async (id: string) => {
        const res = await CART_SERVICE.deleteCart(cartId, user?._id!, id);
        loadCart();
        return res;
    }

    const modifyQuantity = async (id: string, value: number) => {
        const res = await CART_SERVICE.updateQuantityCart(cartId, user?._id!, id, value);
        loadCart();
        return res;
    }

    const removeCart = async () => {
        const res = await CART_SERVICE.clearCart(cartId, user?._id!);
        loadCart();
        return res;
    }

    const isEmpty = useMemo(() => cart.length == 0,[cart]); 
    // const cartTotal = useMemo(() => cart.reduce((total: number,c: CartType) => total += c.quantity * c.price,0),[cart]);
    const cartTotal = useMemo(() => {
        return cart.reduce((total: number, c: CartProductType) => {
            const product = all.find(d => d._id == c._id);
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
        cartTotal,
        loadProducts,
        loading,
        select,
        handleSelect
    }
}

export { useCart };