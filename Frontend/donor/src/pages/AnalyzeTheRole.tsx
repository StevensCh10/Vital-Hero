import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from "../contexts/Auth/AuthContext";

const AnalyzeTheRole = () => {
    const { user } = useContext<AuthContextType>(AuthContext);
    const navigate = useNavigate(); 

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            switch (user.role) {
                case "ADMIN":
                    // Se for ADMIN, direcione-o para uma determinada página
                    navigate('/admin-dashboard');
                    break;
                case "DONOR":
                    console.log()
                    navigate('/home-donor');
                    break;
                case "DOCTOR":
                    navigate('/home-doctor');
                    break;
                case "BLOODCENTER":
                    navigate('/home-bloodcenter');
                    break;
                default:
                    navigate('/login');
                    break;
            }
        }
    }, [user, navigate]);

    return null; 
}

export default AnalyzeTheRole;