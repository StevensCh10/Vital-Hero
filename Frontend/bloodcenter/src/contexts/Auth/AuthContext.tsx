import { createContext } from "react";
import { Donor } from "../../types/Donor";

export type AuthContextType = {
    user: Donor |  null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);