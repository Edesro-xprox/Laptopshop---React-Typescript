import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Accordion from '../components/Accordion.tsx';
import '../App.css';
import { useCart } from '../hooks/useCart.ts';
import Header from '../components/Header.tsx';

function DetailPage() {
  const { cart, removeCart, removeFromCart, modifyQuantity, isEmpty, cartTotal, loadProducts, loadingCart, select, handleSelect, addToCart, addingIds }  = useCart();
  
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
  const specsRef = useRef<HTMLDivElement>(null);

  const handleSeeMoreSpecs = () => {
    specsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    specsRef.current?.focus({ preventScroll: true });
  };

  const getImageUrl = (type: string, image: string) => {
    return new URL(`/src/assets/img/${type}/${image}.jpg`, import.meta.url).href;
  };

  if (!product) {
  return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <h2 className="fw-bold mb-3">Producto no disponible</h2>
          <button className="btn btn-dark" onClick={() => navigate('/shopPage')}>
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }
  
  const specifications = Array.isArray(product?.specifications) ? product.specifications : [];
  const previewSpecs = specifications.slice(0, 4);
  const leftSpecs = previewSpecs.slice(0, 2);
  const rightSpecs = previewSpecs.slice(2, 4);

  return (
    <>
      <Header 
        cart={cart} 
        removeFromCart={removeFromCart} 
        modifyQuantity={modifyQuantity} 
        removeCart={removeCart} 
        isEmpty={isEmpty} 
        cartTotal={cartTotal}
        loadProducts={loadProducts}
        loadingCart={loadingCart}
        select={select}
        handleSelect={handleSelect}
        isVisibleType={false}
        isVisibleCart={true}
        isVisibleLogout={true}
      />

      <main className="d-flex px-5 py-5 w-100" style={{ gap: '6%' }}>
        <div style={{ width: '55%' }}>
            <div className="card border-0 shadow-sm p-4 bg-white">
              <div className="text-center">
                <img
                  src={getImageUrl(product.type, product.image)}
                  alt={product.name}
                  style={{ width: '50%', objectFit: 'contain' }}
                />
              </div>
            </div>

            <div className="mt-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Accordion title="Descripción del producto" description={product.description} />
              <div ref={specsRef} tabIndex={-1} id="especificaciones" className="specs-focus">
                <Accordion title="Especificaciones" specs={product.specifications} />
              </div>
            </div>
          </div>

          <div style={{ width: '45%' }}>
            <div className="card border-0 shadow-sm p-4 h-100 bg-white">
              <h1 className="text-uppercase fw-black fs-3 mb-3" style={{ color: '#1b1b1b' }}>
                {product.name}
              </h1>

              <p className="fs-5" style={{ marginBottom: '2rem' }}>
                Vendido por <strong style={{ textDecoration: 'underline' }}>{product.supplier}</strong>
              </p>

              <p className="fw-bold fs-3 mt-5" style={{ color: '#E89301' }}>
                ${product.price}
              </p>

              <div className="d-flex mt-5">
                <div className="d-flex gap-4 align-items-center" style={{ marginRight: '5%' }}>
                  <button type="button" className="btn btn-dark px-3 py-2 fw-bold" onClick={() => modifyQuantity(product._id, -1)}>
                    -
                  </button>
                  <span className="fw-bold fs-5">{cart.find((c) => c._id == product._id)?.quantity || 0}</span>
                  <button type="button" className="btn btn-dark px-3 py-2 fw-bold" onClick={() => modifyQuantity(product._id, 1)}>
                    +
                  </button>
                </div>

                <div>
                  <button
                        type="button"
                        className="btn btn-dark mt-auto"
                        onClick={() => addToCart(product)}
                        disabled={addingIds.includes(product._id)}
                        aria-busy={addingIds.includes(product._id)}
                    >
                        {addingIds.includes(product._id) ? (
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

              <div className="someSpecifications mt-5">
                <p>Algunas especificaciones:</p>
                <div className="some-specs-grid">
                  <div className="some-specs-col">
                    {leftSpecs.map((spec: { name: string; value: string }) => (
                      <div key={spec.name} className="spec-item">
                        <span className="spec-name">{spec.name}</span>
                        <span className="spec-value">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="some-specs-col">
                    {rightSpecs.map((spec: { name: string; value: string }) => (
                      <div key={spec.name} className="spec-item">
                        <span className="spec-name">{spec.name}</span>
                        <span className="spec-value">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button type="button" className="btn-specs-more mt-3" onClick={handleSeeMoreSpecs}>
                Ver más especificaciones
              </button>
            </div>
          </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">Next Shop - Todos los derechos reservados</p>
        </div>
      </footer>
    </>
  );
}

export default DetailPage;
