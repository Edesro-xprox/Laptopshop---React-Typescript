import LoadingOverlay from '../components/LoadingOverlay';
import { useLogin } from '../hooks/useLogin';

const LoginPage = () => {
  const { loading, handleSubmit, username, setUsername, password, setPassword, handleNewRegister } = useLogin();

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