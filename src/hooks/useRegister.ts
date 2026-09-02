import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { AUTH_SERVICE } from "../services/auth.service";

const useRegister = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleNewRegister = async () =>{
        setLoading(true);
        try{
            if(!Boolean(username) && !Boolean(password) && !Boolean(confirmPassword)){
                toast.warning('Debe completar todos los campos');
                throw new Error("Debe completar todos los campos"); 
            }

            if(confirmPassword !== password){
                toast.warning('Las contraseñas no coinciden');
                throw new Error("Las contraseñas no coinciden"); 
            }

            const res = await AUTH_SERVICE.postNewUser(username, password);
            if(res){
                setLoading(false);
                toast.success('Usuario registrado con éxito');
                navigate('/loginPage');
            }
        }catch(e: any){
            setLoading(false);
            console.error(e.message);
        }
    }

    const handleBack = () => {
        navigate('/loginPage');
    }
    
    return{
        loading,
        username,
        setUsername,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        handleNewRegister,
        handleBack
    }
}

export { useRegister };