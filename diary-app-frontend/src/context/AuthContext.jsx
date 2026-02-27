import { createContext, useEffect, useState } from "react"
import api from '../services/api';
const AuthContext = createContext();
import { useNavigate } from "react-router-dom";
const AuthProvider = ({children})=>{
    const[token,setToken]=useState(localStorage.getItem('token'));
    const[name,setName] = useState(localStorage.getItem('name') || '');
    const [isAuthenticated,setIsAuthenticated] = useState(!!token);
    const Navigate = useNavigate();
    useEffect(()=>{
        if(token){
            localStorage.setItem('token',token);
            localStorage.setItem('name',name);
            api.defaults.headers.common['x-auth-token'] = token;
            setIsAuthenticated(true);;
        }else{
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            delete api.defaults.headers.common['x-auth-token'];
            setIsAuthenticated(false);
        }
    },[token,name]);

    const login = (newToken,newName) =>{
        setToken(newToken);
        setName(newName);
    };

    const logout = ()=>{
        setToken(null);
        setName('');
        Navigate('/login');
    };

    

    return (
        <AuthContext.Provider value={{ token, name, isAuthenticated, login, logout,}}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthProvider };