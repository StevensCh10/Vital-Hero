import { Donor } from "./Donor";

export type DonationForm = {
    id?: number;
    donor: Donor | null;
    q1: string; //Nome do pai
    q2: string; //Nome da mãe
    q3: string; //Número para contato de emergência
    q4: string; //Naturalidade 
    q5: string; //Numero do documento
    q6: string; //Orgão expedidor
    q7: string; //Data de expedição
    q8: string; //Escolaridade
    q9: string; //Profissão
    q10: string; //Trabalho atual
}