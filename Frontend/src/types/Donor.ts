import { Scheduling } from "./Scheduling";

export type Donor = {
    id?: number;
    scheduling?: Scheduling| null;
    name?: string;
    cpf?: string;
    email?: string;
    age?: number;
    gender?: string;
    maritalStatus?: string;
    address?: string;
    phone?: string;
    password?: string;
    bloodType?: string;
    role?: string;
}