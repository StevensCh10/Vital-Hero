import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/'
});

export const useApi = () => ({
    //validateToken: async(token: string) => {},

    signin: async (email: string, password: string) => {
        const response = await api.get(`bloodcenter/${email}/${password}`);
        /*return {
            user: {id: 3,}
        };*/
        return response.data;
    },
    logout: async () => {
        const response = await api.post('/logout');
        return response.data;
    }
});