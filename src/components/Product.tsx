import { useNavigate } from "react-router-dom";
import type { ProductProps } from "../types/ProductType.ts";
import { getImageUrl } from "../utils/image.ts";

function Product({product, image, name, price, description, addToCart, isAdding = false, type}:ProductProps) {
    const navigate = useNavigate();
    
    const handleImageClick = () => {
        navigate('/detailPage', { state: { product } });
    };
    
    return(
        <div className="col-md-6 col-lg-4 my-4 text-center">
            <div className="card h-100">
                <img
                src={getImageUrl(type, image)}
                alt="imagen laptop"
                className="card-img-top"
                onClick={handleImageClick}
                style={{
                    width: "70%",
                    height: "250px",
                    objectFit: "contain",
                    cursor: "pointer",
                }}
                />

                <div className="card-body">
                    <h3 className="text-black fs-5 fw-bold text-uppercase">
                        {name}
                    </h3>

                    <p className="fw-black text-primary fs-4 mb-3">
                        {'S/' + price.toString()}
                    </p>

                    <button
                        type="button"
                        className="btn btn-dark mt-auto btnBuyProduct"
                        onClick={() => addToCart(product)}
                        disabled={isAdding}
                        aria-busy={isAdding}
                    >
                        {isAdding ? (
                            <span className="d-flex justify-content-center align-items-center gap-2">
                                <span className="spin-loading spin-loading-sm" aria-hidden="true" />
                                Agregando...
                            </span>
                        ) : (
                            'Agregar al Carrito'
                        )}
                    </button>
                </div>
            </div>
    </div>
    )
}

export default Product;