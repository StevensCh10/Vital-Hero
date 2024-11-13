import { Address } from "./Address";
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
    address?: Address;
    phone?: string;
    password?: string;
    bloodType?: string;
    role?: string;
}