const CART = {
    getCart: "/shop",
    findCartByUserId: (userId: string) => `/shop/${userId}`,
    addCart: () => `/shop`,
    deleteCart: (id: string) => `/shop/${id}`,
    updateQuantityCart: (id: string, value: number) => `/shop/${id}/${value}`,
    clearCart: "/shop"
};

const PRODUCTS = {
    getProducts: (type: string) => `/data/${type}`,
    getAllProducts: () => '/data'
}

const AUTH = {
    getByUserName: () => `/auth/login`,
    postNewUser: () => `/auth/register`
}

export { CART, PRODUCTS, AUTH }
