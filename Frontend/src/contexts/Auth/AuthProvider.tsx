import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Donor } from "../../types/Donor";
import { useApi } from "../../hooks/useApi";
import { Screening } from "../../types/Screening";
import { DonationForm } from "../../types/DonationForm";
import { BloodCenter } from "../../types/BloodCenter";
import { Doctor } from "../../types/Doctor";

export const AuthProvider = ({ children }: {children: JSX.Element}) => {
    const [user, setUser] = useState<Donor | Doctor | BloodCenter |  null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const api = useApi();

    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem('authToken');
            if (storageData) {
                const data = await api.validateToken(storageData);
                if (data.user) {
                    setUser(data.user);
                }
            }
        }
        validateToken();
    }, [api]);

    const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);
        if(data.user && data.token){
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('authToken', data.token);
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
        localStorage.setItem('user', JSON.stringify(data))
        console.log(data);
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

    const allScheduledDonors = async() => {
        return await api.allScheduledDonors();
    }

    const findSchedulingsByBloodcenter = async(bdID: number) => {
        return await api.findSchedulingsByBloodcenter(bdID);
    }

    const updateDonor = async(donorAtt: Donor) => {
        const data = await api.updateDonor(donorAtt);
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
        const data = await api.toSchedule(idDonor, idSched);
        localStorage.setItem("scheduling", JSON.stringify(data));
        await findDonorById(idDonor);
        return data;
    }

    const unSchedule = async(idDonor: number) => {
        await api.unSchedule(idDonor);
    }

    const findAllBloodstocks = async() => {
        return await api.findAllBloodstocks();
    }

    const register = async(donor: Donor) => {
        const data = await api.register(donor);
        if(data.user && data.token){
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('authToken', data.token);
            return data.user;
        }
        return data;
    }

    const registerDoctor = async(doctor: Doctor) => {
        const data = await api.registerDoctor(doctor);
        if(data.user && data.token){
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('authToken', data.token);
            return data.user;
        }
        return data;
    }

    const addScreening = async(screening: Screening) => {
        const data = await api.addScreening(screening);
        if(data){
            let currentScreening = JSON.parse(localStorage.getItem("screening")!);
            currentScreening = data;
            localStorage.setItem("screenings", JSON.stringify(currentScreening)); 
        }
        return data;
    }

    const updateScreening = async(screening: Screening) => {
        const data = await api.attScreening(screening);
        if(data){
            const currentScreenings = JSON.parse(localStorage.getItem("screenings")!);
            currentScreenings[0] = (data);
            localStorage.setItem("screenings", JSON.stringify(currentScreenings)); 
        }
        return data;
    }

    const addDonationForm = async(donationForm: DonationForm) => {
        const data = await api.addDonationForm(donationForm);
        if(data){
            localStorage.setItem("donationForm", JSON.stringify(data)); 
        }
        return data;
    }

    const updateDonationForm = async(donationForm: DonationForm) => {
        const data = await api.updateDonationForm(donationForm);
        if(data){
            localStorage.setItem("donationForm", JSON.stringify(data)); 
        }
        return data;
    }

    const findAllScreenings = async() => {
        return await api.allScreenings();
    }

    const allDonorsScreenings = async() => {
        return await api.allDonorsScreenings();
    }

    const validateScreening = async(idScreening: number, idDoctor: number) => {
        await api.validateScreening(idScreening, idDoctor);
    }

    const sendFeedback = async(idDonor: number, feedback: string)  => {
        await api.sendFeedback(idDonor, feedback);
    }

    const sendEmailForgotPassword = async(email: string) => {
        await api.sendEmailForgotPassword(email);
    }

    const updatePassword = async(idDonor: number, password: string) => {
        await api.updatePassword(idDonor, password);
    }

    const donationMade = async(idDonorDonated: number[], idDonorNotDonated: number[]) => {
        await api.donationMade(idDonorDonated, idDonorNotDonated);
    }

    return (
        <AuthContext.Provider value={{user, signin, signout, 
                findAllBloodCenters, findAllSchedulings,
                findDonationForm, findScreening, allScheduledDonors, 
                updateDonor: updateDonor, findDonations, findSchedulingById,
                toSchedule, findDonorById, unSchedule, findAllBloodstocks,
                register, registerDoctor, addScreening, updateScreening: updateScreening,
                addDonationForm, updateDonationForm, findSchedulingsByBloodcenter,
                findAllScreenings, allDonorsScreenings, validateScreening,
                sendFeedback, sendEmailForgotPassword, updatePassword, donationMade}}>
            {children}
        </AuthContext.Provider>
    );
}