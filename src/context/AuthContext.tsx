import { createContext, useContext, useState, type ReactNode } from "react";
import type { UserProfile, AuthContextType } from "../types/AuthType";

//Crear contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//Crear proveedor de contexto
//Ejemplo de tipo con objeto: ({ name, age }: { name: string, age: number })
const AuthProvider = ({ children }: { children: ReactNode }) =>{
    const [user, setUser] = useState<UserProfile | null>(null);

    const login = (userData: UserProfile) =>{
        setUser(userData);
    }

    const logout = () =>{ 
        setUser(null);
        localStorage.removeItem('token');
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

//Crear hook para usar el contexto
const useAuth = () =>{
    const context = useContext(AuthContext);
    console.log(context);
    if(!context){
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
}

export { AuthProvider, useAuth };