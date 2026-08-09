import { api } from "../api/api";
import { AUTH } from "../api/endpoints";

const AUTH_SERVICE = {
    getByUserName: async (user: string, password: string) =>{
        try{
            const res = await api.post(AUTH.getByUserName(), { user: user, password: password });
            console.log(res);
            return res;
        } catch(error){
            throw error;
        }
    },
    postNewUser: async (newUser: string, password: string) =>{
        try{
            const res = await api.post(AUTH.postNewUser(), { newUser: newUser, password: password });
            return res;
        }catch(e){
            throw e;
        }
    }
}

export { AUTH_SERVICE };