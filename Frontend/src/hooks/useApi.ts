import axios from 'axios';
import { Donor } from '../types/Donor';
import { Screening } from '../types/Screening';
import { DonationForm } from '../types/DonationForm';

const api = axios.create({
    baseURL: 'https://vital-hero.onrender.com/'
});

export const useApi = () => ({
    //validateToken: async(token: string) => {},

    signin: async (email: string, password: string) => {
        var user = {email: email, password: password}
        return await api.post(`api/auth/login`, user)
            .then((response) => response.data); 
    },
    findDonorById: async (idDonor: number) => {
        return await api.get(`donor/${idDonor}`)
            .then((response) => response.data);
    },
    findAllBloodCenters: async () => {
        return await api.get('bloodcenter/findall')
            .then((response) => response.data);
            
    },
    findAllSchedulings: async () => {
        return await api.get(`bloodcenter/scheduling/all`)
            .then((response) => response.data);
    },
    findSchedulingsByBloodcenter: async (bcID: number) => {
        return await api.get(`bloodcenter/scheduling/all/${bcID}`)
            .then((response) => response.data);
    },
    findDonationFormByDonor: async (idDonor: number) => {
        return await api.get(`donor/donationform/findbydonor/${idDonor}`)
            .then((response) => response.data)
            .catch(() => null);  
    },
    findScreeningByDonor: async (idDonor: number) => {
        return await api.get(`donor/screening/all/${idDonor}`)
            .then((response) => response.data)
            .catch(() => null); 
    },
    allScheduledDonors: async () => {
        return await api.get('donor/allScheduled')
            .then((response) => response.data)
            .catch(() => null); 
    },
    updateDonor: async (donorAtt: Donor) => {
        return await api.put('donor', donorAtt)
        .then((response) => response.data);
    },
    findDonations: async (idDonor: number) => {
        return await api.get(`donor/donationform/all/${idDonor}`)
        .then((response) => response.data)
        .catch(() => null)
    },
    findSchedById: async (idSched: number) => {
        return await api.get(`bloodcenter/scheduling/${idSched}`)
        .then((response) => response.data)
        .catch(() => null)
    },
    toSchedule: async (idDonor: number, idSched: number) => {
        await api.put(`donor/toschedule/${idDonor}/${idSched}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        })
    },
    unSchedule: async (idDonor: number) => {
        await api.put(`donor/unschedule/${idDonor}`)
        .then((response) => response.data)
        .catch(() => null)
    },
    findAllBloodstocks: async () => {
        return await api.get(`bloodcenter/bloodstock/all`)
        .then((response) => response.data)
        .catch(() => null)
    },
    register: async (formData: FormData) => {
        return await api.post('donor', formData)
        .then((response) => response.data)
        .catch(() => null)
    },
    registerDoctor: async (formData: FormData) => {
        return await api.post('doctor', formData)
        .then((response) => response.data);
    },
    addScreening: async(screening: Screening) => {
        return await api.post(`donor/screening`, screening)
        .then((response) => response.data)
        .catch(() => null)
    },
    attScreening: async(screening: Screening) => {
        return await api.put(`donor/screening`, screening)
        .then((response) => response.data);
    },
    addDonationForm: async(donationForm: DonationForm) => {
        return await api.post(`donor/donationform`, donationForm)
        .then((response) => response.data)
        .catch(() => null)
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
        return await api.put(`doctor/validatescreening/${idScreening}/${idDoctor}`)
        .then((response) => response.data);
    },
    sendFeedback: async(idDonor: number, feedback: string) => {
        await api.post(`donor/sendfeedback/${idDonor}?feedback=${encodeURIComponent(feedback)}`);
    },
    sendEmailForgotPassword: async(email: string) => {
        await api.post(`api/auth/forgotpassword?email=${email}`);
    },
    updatePassword: async(idDonor: number, password: string) => {
        await api.put(`donor/updatepassword/${idDonor}?password=${password}`);
    },
    donationMade: async(idDonorDonated: number[], idDonorNotDonated: number[]) => {
        await api.post(`bloodcenter/donation?donorIdsDonated=${idDonorDonated}&donorIdsNotDonated=${idDonorNotDonated}`);
    }
});