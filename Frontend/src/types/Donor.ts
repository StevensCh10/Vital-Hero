import { Scheduling } from "./Scheduling";

export type Donor = {
    id: number;
    scheduling?: Scheduling| null;
    name?: string;
    email?: string;
    age?: number;
    gender?: string;
    maritalStatus?: string;
    address?: string;
    photo?: string;
    phone?: string;
    bloodType?: string;
    role?: string;
}