import { Address } from "./Address";

export type BloodCenter = {
    id: number,
    name: string;
    email: string;
    address: Address;
    phone: string;
    role?: string;
}