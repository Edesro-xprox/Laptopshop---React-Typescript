import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.tsx'
import ShopPage from './pages/ShopPage.tsx'
import './App.css';
import RoutePage from './pages/RegisterPage.tsx';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext.tsx';
// import { CartProvider } from './context/CartContext.tsx';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Navigate to="loginPage" />} />
          <Route path="/loginPage" element={<LoginPage />}></Route>
          <Route path="/shopPage" element={<ShopPage />}></Route>
          <Route path='/registerPage' element={<RoutePage />}></Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}

export default App