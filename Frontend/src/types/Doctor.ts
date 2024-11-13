import { Address } from "./Address";

export type Doctor = {
    id?: number;
    name?: string;
    cpf?: string;
    crm?: string;
    email?: string;
    age?: number;
    gender?: string;
    maritalStatus?: string;
    address?: Address;
    phone?: string;
    password?: string;
    role?: string;
}