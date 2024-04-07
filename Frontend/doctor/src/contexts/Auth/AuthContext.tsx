import { createContext } from "react";
import { Donor } from "../../types/Doctor";

export type AuthContextType = {
    user: Donor |  null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);