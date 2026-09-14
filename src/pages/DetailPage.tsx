import { useLocation, useNavigate } from 'react-router-dom';
import Accordion from '../components/Accordion.tsx';
import logoHeader from '../assets/img/nextShop.png';
import '../App.css';

function DetailPage() {
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
      <header className="header">
        <div className="container-xl">
          <div className="row justify-content-center justify-content-md-between align-items-center py-3">
            <div className="col-8 col-md-3">
              <img className="img-fluid" src={logoHeader} alt="imagen logo" />
            </div>
            <div className="col-md-3 text-md-end mt-3 mt-md-0">
              <button
                type="button"
                className="btn btn-outline-dark px-4 py-2 fw-semibold border-2 bg-[#474747] text-white btnReturn"
                onClick={() => navigate('/shopPage')}

                style={{ backgroundColor: "#474747" }}
              >
                Regresar
              </button>
            </div>
          </div>
        </div>
      </header>

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

            <div className="mt-4">
              <Accordion title="Descripción del producto" description={product.description} />
            </div>
          </div>

          <div style={{ width: '45%' }}>
            <div className="card border-0 shadow-sm p-4 h-100 bg-white">
              <h1 className="text-uppercase fw-black fs-3 mb-3" style={{ color: '#1b1b1b' }}>
                {product.name}
              </h1>

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
