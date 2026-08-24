import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_SERVICE } from '../services/auth.service';
import { CART_SERVICE } from '../services/cart.service';
import { useAuth } from '../context/AuthContext';
import { useCartInfo } from '../context/CartContext';
import LoadingOverlay from '../components/LoadingOverlay';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { getCartId } = useCartInfo();

//   const toastRef = useRef<ToastRef>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try{
      const resL = await AUTH_SERVICE.getByUserName(username, password);
      if(resL){
        localStorage.setItem('user', JSON.stringify(resL.data.userFound));
        localStorage.setItem('token', resL.data.token);
        login({ ...resL.data.userFound });
        
        const resC = await CART_SERVICE.findCartByUserId(resL.data.userFound._id);
        if(resC){
          localStorage.setItem('cartId', resC?.data?._id);
          getCartId(resC?.data?._id || '');
        }

        navigate('/shopPage');
        setLoading(false);
      }
    }catch(e: any){
      setLoading(false);
      toast.warning("Credenciales incorrectas");
      console.error(e);
    }
  }

  const handleNewRegister = () => {
    navigate('/registerPage');
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: '#f1f3f5' }}
    >
      <LoadingOverlay open={loading}></LoadingOverlay>
      <form
        onSubmit={handleSubmit}
        className="p-4 block"
        style={{
          width: '380px',
          borderRadius: '16px',
          backgroundColor: '#5A5A5A',
          color: '#ffffff',
          boxShadow: '0 0 20px rgba(0,0,0,0.12)',
          padding: '1%',
          border: '5px solid #474747'
        }}
      >
        <div className="text-center fw-bold fs-3">
          {/* <span className='text-primary'>&lt;/&gt;</span>  */}
          <span className="text-white">Next</span>
          <span className="text-primary">Shop</span>
        </div>

        <div className="mt-4">
          <label htmlFor="username" className="fw-bold text-white block">
            Usuario:
          </label>
          <input
            type="text"
            id="username"
            placeholder="Ingresa tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control block mt-2"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="fw-bold text-white">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control block mt-2"
          />
        </div>

        <div className="d-flex justify-content-center mt-5">
          <button type="submit" className="btn text-white bg-primary" onClick={handleSubmit}>
            INGRESAR
          </button>
        </div>

        <div className='form-question'>
          <a className='question' onClick={handleNewRegister}>¿No estás registrado?</a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;