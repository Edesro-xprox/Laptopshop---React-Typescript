import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCartInfo } from "../context/CartContext";
import { AUTH_SERVICE } from "../services/auth.service";
import { CART_SERVICE } from "../services/cart.service";
import { toast } from "react-toastify";

const useLogin = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const { getCartId } = useCartInfo();

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

  return{
    loading,
    handleSubmit,
    username,
    setUsername,
    password,
    setPassword,
    handleNewRegister
  }
}

export { useLogin };