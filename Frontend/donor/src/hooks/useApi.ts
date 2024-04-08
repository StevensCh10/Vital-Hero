import axios from 'axios';
import { Donor } from '../types/Donor';
import { Screening } from '../types/Screening';

const api = axios.create({
    baseURL: 'http://localhost:8080/'
});

export const useApi = () => ({
    //validateToken: async(token: string) => {},

    signin: async (email: string, password: string) => {
        return await api.get(`donor/${email}/${password}`)
            .then((response) => response.data)
            .catch((error) => console.log(error));     
    },
    findDonorById: async (idDonor: number) => {
        return await api.get(`donor/${idDonor}`)
            .then((response) => response.data)
            .catch((error) => console.log(error));  
    },
    findAllBloodCenters: async () => {
        return await api.get('bloodcenter/findall')
            .then((response) => response.data)
            .catch((error) => console.log(error));  
            
    },
    findAllSchedulings: async () => {
        return await api.get(`bloodcenter/scheduling/all`)
            .then((response) => response.data)
            .catch((error) => console.log(error));  
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
    changePassword: async (donorAtt: Donor) => {
        return await api.put('donor', donorAtt)
        .then((response) => response.data)
        .catch((e) => console.log(e))
    },
    findDonations: async (idDonor: number) => {
        return await api.get(`donor/donationform/all/${idDonor}`)
        .then((response) => response.data)
        .catch(() => null)
    },
    findSchedById: async (idSched: number) => {
        return await api.get(`/bloodcenter/scheduling/${idSched}`)
        .then((response) => response.data)
        .catch(() => null)
    },
    toSchedule: async (idDonor: number, idSched: number) => {
        await api.put(`/donor/toschedule/${idDonor}/${idSched}`)
        .then((response) => response.data)
        .catch(() => null)
    },
    unSchedule: async (idDonor: number) => {
        await api.put(`/donor/unschedule/${idDonor}`)
        .then((response) => response.data)
        .catch(() => null)
    },
    findAllBloodstocks: async () => {
        return await api.get(`/bloodcenter/bloodstock/all`)
        .then((response) => response.data)
        .catch(() => null)
    },
    register: async (formData: FormData) => {
        return await api.post('donor', formData)
        .then((response) => response.data)
        .catch(() => null)
    },
    addScreening: async(screening: Screening) => {
        return await api.post('donor/screening', screening)
        .then((response) => response.data)
        .catch(() => null)
    }
});