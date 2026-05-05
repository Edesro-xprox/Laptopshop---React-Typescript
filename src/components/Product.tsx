import type { ProductType } from "../types/ProductType.ts";

interface ProductProps{
    product: ProductType;
    image: string;
    name: string;
    price: number;
    description: string;
    addToCart: (product: ProductType) => void;
}

function Product({product, image, name, price, description, addToCart}:ProductProps) {
    return(
        <div className="col-md-6 col-lg-4 my-4">
            <div className="card h-100">
                <img
                src={`/img/${image}.jpg`}
                alt="imagen laptop"
                className="card-img-top"
                style={{
                    width: "70%",
                    height: "250px",
                    objectFit: "contain"
                }}
                />

                <div className="card-body">
                    <h3 className="text-black fs-5 fw-bold text-uppercase">
                        {name}
                    </h3>

                    <p className="flex-grow-1" style={{ height: "40px" }}>
                        {description}
                    </p>

                    <p className="fw-black text-primary fs-4 mb-3">
                        {price}
                    </p>

                    <button
                        type="button"
                        className="btn btn-dark w-100 mt-auto"
                        onClick={() => addToCart(product)}
                    >
                        Agregar al Carrito
                    </button>
                </div>
            </div>
    </div>
    )
}

export default Product;