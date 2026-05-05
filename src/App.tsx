import Header from './components/Header.tsx'
// import Navbar from './components/Navbar.tsx'
import Product from './components/Product.tsx'
import './App.css'
import { useCart } from './hooks/useCart.js';

function App() {

  const { cart, removeCart, removeFromCart, modifyQuantity, data, addToCart, isEmpty, cartTotal }  = useCart();

  return (
    <>
    <Header cart={cart} removeFromCart = {removeFromCart} modifyQuantity={modifyQuantity} removeCart={removeCart} isEmpty={isEmpty} cartTotal={cartTotal}/>
    {/* <Navbar/> */}
    <main className="mt-5 main-shop">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row">
          {
            data.map(d => {
              return <Product
                price={d.price}
                name={d.name}
                image={d.image}
                key={d._id}
                description={d.description}
                product = {d}
                addToCart = {addToCart}
              ></Product>
            })
          }
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
