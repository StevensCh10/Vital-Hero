import { Donor } from "./Donor";

export type DonationForm = {
    id?: number;
    donor: Donor | null;
    q1: string; //Nome do pai
    q2: string; //Nome da mãe
    q3: string; //Número para contato de emergência
    q4: string; //Naturalidade 
    q5: string; //Documento(tipo)
    q6: string; //UF
    q7: string; //Numero do documento
    q8: string; //Orgão expedidor
    q9: string; //Escolaridade
    q10: string; //Profissão
    q11: string; //Trabalho atual
}