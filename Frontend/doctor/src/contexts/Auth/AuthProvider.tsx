import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Donor } from "../../types/Doctor";
import { useApi } from "../../hooks/useApi";

export const AuthProvider = ({ children }: {children: JSX.Element}) => {
    const [user, setUser] = useState<Donor | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const api = useApi();

    useEffect(() => {
        const saveObj = () => {
            
        }
        saveObj();
    }, [user]);

    const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);
        if(data){
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data)); 
            return true;
        }
        return false;
    }

    const signout = async () => {
        await api.logout(); 
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}