const CART = {
    getCart: "/shop",
    addCart: () => `/shop`,
    deleteCart: (id: string) => `/shop/${id}`,
    updateQuantityCart: (id: string, value: number) => `/shop/${id}/${value}`,
    clearCart: "/shop"
};

const PRODUCTS = {
    getProducts: (type: string) => `/data/${type}`
}

export { CART, PRODUCTS }
