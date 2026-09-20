import { useLocation, useNavigate } from 'react-router-dom';
import Accordion from '../components/Accordion.tsx';
import '../App.css';
import { useCart } from '../hooks/useCart.ts';
import Header from '../components/Header.tsx';

function DetailPage() {
  const { cart, removeCart, removeFromCart, modifyQuantity, isEmpty, cartTotal, loadProducts, select, handleSelect }  = useCart();
  
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

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
        select={select}
        handleSelect={handleSelect}
        isVisibleType={false}
        isVisibleCart={false}
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
              <Accordion title="Especificaciones" specs={product.specifications} />
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

              <p className="fw-bold fs-3 mb-4" style={{ color: '#E89301' }}>
                ${product.price}
              </p>

              <div className="d-flex">
                <div className="d-flex gap-4 align-items-center" style={{ marginRight: '5%' }}>
                  <button type="button" className="btn btn-dark px-3 py-2 fw-bold">
                    -
                  </button>
                  <span className="fw-bold fs-5">1</span>
                  <button type="button" className="btn btn-dark px-3 py-2 fw-bold">
                    +
                  </button>
                </div>

                <div>
                  <button type="button" className="btn btn-dark py-3 fw-bold fs-5">
                    Agregar al carrito
                  </button>
                </div>
              </div>
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
