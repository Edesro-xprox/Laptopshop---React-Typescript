import LoadingOverlay from '../components/LoadingOverlay';
import { useRegister } from '../hooks/useRegister';

const RoutePage = () =>{
    const { loading, username, setUsername, password, setPassword, confirmPassword, setConfirmPassword, handleNewRegister, handleBack } = useRegister();

    return(
        <div
            className="d-flex justify-content-center align-items-center min-vh-100"
            style={{ backgroundColor: '#f1f3f5' }}
        >
            <LoadingOverlay open={loading}></LoadingOverlay>
            <div
                className="p-4 block"
                style={{
                    width: '380px',
                    borderRadius: '16px',
                    backgroundColor: '#334155',
                    color: '#ffffff',
                    boxShadow: '0 0 20px rgba(0,0,0,0.12)',
                    padding: '1%',
                    border: '5px solid #474747'
                }}
            >
                <div className="text-center fw-bold fs-3">
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

                <div className="mt-4">
                    <label htmlFor="confirmPassword" className="fw-bold text-white">
                        Confirmar contraseña:
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirma tu contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="form-control block mt-2"
                    />
                </div>

                <div className="d-flex justify-content-center mt-5">
                    <button type="button" onClick={handleNewRegister} className="btn text-white bg-primary">
                        Guardar
                    </button>
                </div>
        
                <div className='form-question mt-3 text-center'>
                    <a className='question' onClick={handleBack}>Volver</a>
                </div>
            </div>
        </div>
    )
}

export default RoutePage;