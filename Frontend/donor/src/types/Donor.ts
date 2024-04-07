export type Donor = {
    id: number;
    scheduling: number| null;
    name: string;
    cpf: string;
    email: string;
    age: number;
    gender: string;
    maritalStatus: string;
    address: string;
    photo?: number;
    phone: string;
    password: string;
}