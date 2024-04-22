import { DonationForm } from "../../types/DonationForm";
import { BloodCenter } from "../../types/BloodCenter";
import { Bloodstock } from "../../types/Bloodstock";
import { Scheduling } from "../../types/Scheduling";
import { Screening } from "../../types/Screening";
import { Donation } from "../../types/Donation";
import { Doctor } from "../../types/Doctor";
import { Donor } from "../../types/Donor";
import { createContext } from "react";

export type AuthContextType = {
    user: Donor | Doctor | BloodCenter |  null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
    findDonorById: (idDonor: number) => Promise<Donor>;
    findAllBloodCenters: () => Promise<BloodCenter[]>;
    findAllSchedulings: () => Promise<Scheduling[]>;
    findDonationForm: (idDonor: number) => Promise<DonationForm>;
    findScreening: (idDonor: number) => Promise<Screening[]>;
    updateDonor: (donorAtt: Donor) => Promise<Donor>;
    findDonations: (idDonor: number) => Promise<Donation[]>;
    findSchedulingById: (idScheduling: number) => Promise<Scheduling>;
    toSchedule: (idDonor: number, idSched: number) => void;
    unSchedule: (idDonor: number) => void;
    findAllBloodstocks: () => Promise<Bloodstock[]>;
    register: (donor: FormData) => Promise<Donor>;
    addScreening: (screening: Screening) => Promise<Screening>;
    updateScreening: (screening: Screening) => Promise<Screening>;
    addDonationForm: (donationForm: DonationForm) => Promise<DonationForm>;
    updateDonationForm: (donationForm: DonationForm) => Promise<DonationForm>;
}

export const AuthContext = createContext<AuthContextType>(null!);