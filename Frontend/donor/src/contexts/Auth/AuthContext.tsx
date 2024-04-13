import { createContext } from "react";
import { Donor } from "../../types/Donor";
import { BloodCenter } from "../../types/BloodCenter";
import { Scheduling } from "../../types/Scheduling";
import { DonationForm } from "../../types/DonationForm";
import { Screening } from "../../types/Screening";
import { Donation } from "../../types/Donation";
import { Bloodstock } from "../../types/Bloodstock";

export type AuthContextType = {
    user: Donor |  null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
    findDonorById: (idDonor: number) => Promise<Donor>;
    findAllBloodCenters: () => Promise<BloodCenter[]>;
    findAllSchedulings: () => Promise<Scheduling[]>;
    findDonationForm: (idDonor: number) => Promise<DonationForm>;
    findScreening: (idDonor: number) => Promise<Screening[]>;
    changePassword: (donorAtt: Donor) => Promise<Donor>;
    findDonations: (idDonor: number) => Promise<Donation[]>;
    findSchedulingById: (idScheduling: number) => Promise<Scheduling>;
    toSchedule: (idDonor: number, idSched: number) => void;
    unSchedule: (idDonor: number) => void;
    findAllBloodstocks: () => Promise<Bloodstock[]>;
    register: (donor: FormData) => Promise<Donor>;
    addScreening: (screening: Screening) => Promise<Screening>;
    attScreening: (screening: Screening) => Promise<Screening>;
}

export const AuthContext = createContext<AuthContextType>(null!);