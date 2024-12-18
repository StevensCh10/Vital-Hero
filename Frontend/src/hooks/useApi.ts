import axios from 'axios';
import { Donor } from '../types/Donor';
import { Screening } from '../types/Screening';
import { DonationForm } from '../types/DonationForm';
import { Doctor } from '../types/Doctor';

const api = axios.create({
    baseURL: 'https://vital-hero.onrender.com/'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const useApi = () => ({
    validateToken: async (token: string) => {
        const response = await api.post('auth/validate-token', { token });
        return response.data;
    },
    signin: async (email: string, password: string) => {
        var user = {email: email, password: password}
        return await api.post(`auth/login`, user)
            .then((response) => response.data)
            .catch((e) => {throw e.response.data});
    },
    findDonorById: async (idDonor: number) => {
        return await api.get(`donor/${idDonor}`)
            .then((response) => response.data);
    },
    findAllBloodCenters: async () => {
        return await api.get('bloodcenter/all')
            .then((response) => response.data) 
    },
    findAllSchedulings: async () => {
        return await api.get(`bloodcenter/scheduling/all`)
            .then((response) => response.data)       
    },
    findSchedulingsByBloodcenter: async (bcID: number) => {
        return await api.get(`bloodcenter/scheduling/all/${bcID}`)
            .then((response) => response.data)
            .catch((e) => {throw e.response.data}); 
    },
    findDonationFormByDonor: async (idDonor: number) => {
        return await api.get(`donor/donationform/findbydonor/${idDonor}`)
            .then((response) => response.data)
            .catch(() => null);  
    },
    findScreeningByDonor: async (idDonor: number) => {
        return await api.get(`donor/screening/${idDonor}`)
            .then((response) => response.data)
            .catch(() => null); 
    },
    allScheduledDonors: async () => {
        return await api.get('donor/allScheduled')
            .then((response) => response.data)
            .catch((e) => {throw e.response.data}); 
    },
    updateDonor: async (donorAtt: Donor) => {
        return await api.put('donor', donorAtt)
        .then((response) => response.data)
        .catch((e) => {throw e.response.data});
    },
    findDonations: async (idDonor: number) => {
        return await api.get(`donor/donation/all/${idDonor}`)
        .then((response) => response.data)
        .catch((e) => {throw e.response.data});
    },
    findSchedById: async (idSched: number) => {
        return await api.get(`bloodcenter/scheduling/${idSched}`)
        .then((response) => response.data)
        .catch((e) => {throw e.response.data});
    },
    toSchedule: async (idDonor: number, idSched: number) => {
        return await api.put(`donor/toschedule/${idDonor}/${idSched}`, {})
        .then(response => response.data)
        .catch((e) => {throw e.response.data});
    },
    unSchedule: async (idDonor: number) => {
        await api.put(`donor/unschedule/${idDonor}`)
        .then((response) => response.data)
        .catch((e) => {throw e.response.data});
    },
    findAllBloodstocks: async () => {
        return await api.get(`bloodcenter/bloodstock/all`)
        .then((response) => response.data)
        .catch((e) => {throw e.response.data});
    },
    register: async (donor: Donor) => {
        return await api.post('auth/donor', donor)
        .then((response) => response.data)
        .catch((e) => {throw e.response.data});
    },
    registerDoctor: async (doctor: Doctor) => {
        return await api.post('auth/doctor', doctor)
        .then((response) => response.data);
    },
    addScreening: async(screening: Screening) => {
        return await api.post(`donor/screening`, screening)
        .then((response) => response.data)
        .catch((e) => {throw e.response.data});
    },
    attScreening: async(screening: Screening) => {
        return await api.put(`donor/screening`, screening)
        .then((response) => response.data);
    },
    addDonationForm: async(donationForm: DonationForm) => {
        return await api.post(`donor/donationform`, donationForm)
        .then((response) => response.data)
        .catch((e) => {throw e.response.data});
    },
    updateDonationForm: async(donationForm: DonationForm) => {
        return await api.put(`donor/donationform`, donationForm)
        .then((response) => response.data);
    },
    allScreenings: async() => {
        return await api.get(`doctor/screenings/all`)
        .then((response) => response.data);
    },
    allDonorsScreenings: async() => {
        return await api.get(`doctor/donorscreenings/all`)
        .then((response) => response.data);
    },
    validateScreening: async(idScreening: Number, idDoctor: number) => {
        await api.put(`doctor/validatescreening/${idScreening}/${idDoctor}`,{});
    },
    sendFeedback: async(idDonor: number, feedback: string) => {
        await api.post(`donor/sendfeedback/${idDonor}?feedback=${encodeURIComponent(feedback)}`);
    },
    sendEmailForgotPassword: async(email: string) => {
        await api.post(`auth/forgotpassword?email=${email}`)
        .catch((e) => {throw e.response.data});
    },
    updatePassword: async(idDonor: number, password: string) => {
        await api.put(`donor/updatepassword/${idDonor}?password=${password}`);
    },
    donationMade: async(idDonorDonated: number[], idDonorNotDonated: number[]) => {
        await api.post(`bloodcenter/donation?donorIdsDonated=${idDonorDonated}&donorIdsNotDonated=${idDonorNotDonated}`);
    }
});