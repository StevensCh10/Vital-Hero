import axios from 'axios';
import { Donor } from '../types/Donor';
import { Screening } from '../types/Screening';
import { DonationForm } from '../types/DonationForm';

const api = axios.create({
    baseURL: 'https://vital-hero.onrender.com/'
});

const authToken = localStorage.getItem("authToken");

export const useApi = () => ({
    validateToken: async (token: string) => {
        const response = await api.post('auth/validate', { token });
        return response.data;
    },
    signin: async (email: string, password: string) => {
        var user = {email: email, password: password}
        return await api.post(`auth/login`, user)
            .then((response) => response.data)
            .catch((e) => {throw e.response.data});
    },
    findDonorById: async (idDonor: number) => {
        return await api.get(`donor/${idDonor}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then((response) => response.data);
    },
    findAllBloodCenters: async () => {
        return await api.get('bloodcenter/all', {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then((response) => response.data) 
    },
    findAllSchedulings: async () => {
        return await api.get(`bloodcenter/scheduling/all`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then((response) => response.data)       
    },
    findSchedulingsByBloodcenter: async (bcID: number) => {
        return await api.get(`bloodcenter/scheduling/all/${bcID}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then((response) => response.data)
            .catch((e) => {throw e.response.data}); 
    },
    findDonationFormByDonor: async (idDonor: number) => {
        return await api.get(`donor/donationform/findbydonor/${idDonor}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then((response) => response.data)
            .catch(() => null);  
    },
    findScreeningByDonor: async (idDonor: number) => {
        return await api.get(`donor/screening/all/${idDonor}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then((response) => response.data)
            .catch(() => null); 
    },
    allScheduledDonors: async () => {
        return await api.get('donor/allScheduled', {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then((response) => response.data)
            .catch((e) => {throw e.response.data}); 
    },
    updateDonor: async (donorAtt: Donor) => {
        return await api.put('donor', donorAtt, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.data)
        .catch((e) => {throw e.response.data});
    },
    findDonations: async (idDonor: number) => {
        return await api.get(`donor/donation/all/${idDonor}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.data)
        .catch((e) => {throw e.response.data});
    },
    findSchedById: async (idSched: number) => {
        return await api.get(`bloodcenter/scheduling/${idSched}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.data)
        .catch((e) => {throw e.response.data});
    },
    toSchedule: async (idDonor: number, idSched: number) => {
        await api.put(`donor/toschedule/${idDonor}/${idSched}`, {}, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .catch((e) => {throw e.response.data});
    },
    unSchedule: async (idDonor: number) => {
        await api.put(`donor/unschedule/${idDonor}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.data)
        .catch((e) => {throw e.response.data});
    },
    findAllBloodstocks: async () => {
        return await api.get(`bloodcenter/bloodstock/all`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.data)
        .catch((e) => {throw e.response.data});
    },
    register: async (formData: FormData) => {
        return await api.post('auth/donor', formData, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.data)
        .catch((e) => {throw e.response.data});
    },
    registerDoctor: async (formData: FormData) => {
        return await api.post('auth/doctor', formData, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.data);
    },
    addScreening: async(screening: Screening) => {
        return await api.post(`donor/screening`, screening, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.data)
        .catch((e) => {throw e.response.data});
    },
    attScreening: async(screening: Screening) => {
        return await api.put(`donor/screening`, screening, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.data);
    },
    addDonationForm: async(donationForm: DonationForm) => {
        return await api.post(`donor/donationform`, donationForm, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.data)
        .catch((e) => {throw e.response.data});
    },
    updateDonationForm: async(donationForm: DonationForm) => {
        return await api.put(`donor/donationform`, donationForm, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.data);
    },
    allScreenings: async() => {
        return await api.get(`doctor/screenings/all`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.data);
    },
    allDonorsScreenings: async() => {
        return await api.get(`doctor/donorscreenings/all`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.data);
    },
    validateScreening: async(idScreening: Number, idDoctor: number) => {
        await api.put(`doctor/validatescreening/${idScreening}/${idDoctor}`,{}, 
              {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                  'Content-Type': 'application/json' // Caso seja necessário
                }
              }
            );
    },
    sendFeedback: async(idDonor: number, feedback: string) => {
        await api.post(`donor/sendfeedback/${idDonor}?feedback=${encodeURIComponent(feedback)}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
    },
    sendEmailForgotPassword: async(email: string) => {
        await api.post(`auth/forgotpassword?email=${email}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .catch((e) => {throw e.response.data});
    },
    updatePassword: async(idDonor: number, password: string) => {
        await api.put(`donor/updatepassword/${idDonor}?password=${password}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
    },
    donationMade: async(idDonorDonated: number[], idDonorNotDonated: number[]) => {
        await api.post(`bloodcenter/donation?donorIdsDonated=${idDonorDonated}&donorIdsNotDonated=${idDonorNotDonated}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
    }
});