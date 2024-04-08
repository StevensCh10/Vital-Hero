import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { Donor } from "../../types/Donor";
import { useApi } from "../../hooks/useApi";

export const AuthProvider = ({ children }: {children: JSX.Element}) => {
    const [user, setUser] = useState<Donor | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const api = useApi();

    const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);
        if(data){
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data)); 
            return true;
        }
        return false;
    }

    const signout = () => {
        localStorage.clear();
        setUser(null);
    }

    const findDonorById = async(idDonor: number) => {
        const data = await api.findDonorById(idDonor)
        setUser(data);
        //localStorage.setItem('user', JSON.stringify(data))
        return data;
    }

    const findAllBloodCenters = async() => {
        return await api.findAllBloodCenters();
    }

    const findAllSchedulings = async() => {
        return await api.findAllSchedulings();
    }

    const findDonationForm = async(idDonor: number) => {
        return await api.findDonationFormByDonor(idDonor);
    }

    const findScreening = async(idDonor: number) => {
        return await api.findScreeningByDonor(idDonor);
    }

    const changePassword = async(donorAtt: Donor) => {
        const data = await api.changePassword(donorAtt);
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    }

    const findDonations = async(idDonor: number) => {
        return await api.findDonations(idDonor);
    }

    const findSchedulingById = async(idScheduling: number) => {
        return await api.findSchedById(idScheduling);
    }

    const toSchedule = async(idDonor: number, idSched: number) => {
        await api.toSchedule(idDonor, idSched);
    }

    const unSchedule = async(idDonor: number) => {
        await api.unSchedule(idDonor);
    }

    const findAllBloodstocks = async() => {
        return await api.findAllBloodstocks();
    }

    const register = async(donor: FormData) => {
        const data = await api.register(donor);
        if(data){
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data)); 
        }
        return data;
    }
    return (
        <AuthContext.Provider value={{user, signin, signout, 
                findAllBloodCenters, findAllSchedulings,
                findDonationForm, findScreening, changePassword,
                findDonations, findSchedulingById, toSchedule,
                findDonorById, unSchedule, findAllBloodstocks,
                register}}>
            {children}
        </AuthContext.Provider>
    );
}