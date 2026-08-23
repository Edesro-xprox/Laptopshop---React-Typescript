type ProductType = {
    _id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    type: string;
}

interface ProductProps{
    product: ProductType;
    image: string;
    name: string;
    price: number;
    description: string;
    addToCart: (product: ProductType) => void;
    type: string;
}

export type {
    ProductType,
    ProductProps
};