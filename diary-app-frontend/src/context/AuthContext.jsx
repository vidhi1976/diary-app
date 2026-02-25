import { createContext, useEffect, useState } from "react"
import api from '../services/api';
const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const[token,setToken]=useState(localStorage.getItem('token'));
    const [isAuthenticated,setIsAuthenticated] = useState(!!token);

    useEffect(()=>{
        if(token){
            localStorage.setItem('token',token);
            api.defaults.headers.common['x-auth-token'] = token;
            setIsAuthenticated(true);;
        }else{
            localStorage.removeItem('token');
            delete api.defaults.headers.common['x-auth-token'];
            setIsAuthenticated(false);
        }
    },[token]);

    const login = (newToken) =>{
        setToken(newToken);
    };

    const logout = ()=>{
        setToken(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthProvider };