import Header from './components/Header.tsx'
// import Navbar from './components/Navbar.tsx'
import Product from './components/Product.tsx'
import './App.css'
import { useCart } from './hooks/useCart.ts';

function App() {
  const { cart, removeCart, removeFromCart, modifyQuantity, data, addToCart, isEmpty, cartTotal, loadProducts, loading }  = useCart();

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
      />
      {/* <Navbar/> */}
      <main className="mt-5 main-shop">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row">
          {loading && data.length === 0 ? (
            <p className="text-center mt-5 fs-4">Cargando productos...</p>
          ) : data.length === 0 ? (
            <p className="text-center mt-5 fs-4">No hay items disponibles</p>
          ) : (
            data.map(d => (
              <Product
                price={d.price}
                name={d.name}
                image={d.image}
                key={d._id}
                description={d.description}
                product={d}
                addToCart={addToCart}
                type={d.type}
              />
            ))
          )}
        </div>
      </main>
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">Dev Espinoza - Todos los derechos reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
