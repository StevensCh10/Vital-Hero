import { Donor } from "./Donor";

export type Screening = {
    id?: number;
    donor?: Donor | null;
    doctor?: number | null;
    q1: string; //Ja doou sangue? Há quanto tempo? Sentiu-se mal?
    q2: string; //Tem alergia? A que? Quando foi a ultima crise? Faz tratamento? Qual?
    q3: string; //Já foi operado? Quando? De que? Precisou tomar sangue?
    q4: string; //Tomou alguma vacina recente? Qual?
    q5: string; //Tem ou teve convulsões? Quando?
    q6: string; //Teve febre nas últimas duas semanas?
    q7: string; //Teve algum resfriado ou sintomas de gripe recentemente?
    q8: string; //Viajou para fora do país nos últimos seis meses?
    q9: string; //Já teve hepatite?
    q10: string; //Já teve malária?
    q11: string; //Já teve câncer?
    q12: string; //Já teve um ataque cardíaco ou derrame?
    q13: string; //está grávida ou amamentando atualmente?
    q14: string; //Já teve uma transfusão de sangue nos últimos doze meses?
    q15: string; //Já teve uma reação alérgica grave a um medicamento?
    q16: string; //Já foi diagnosticado com HIV ou AIDS?
    q17: string; //Já teve um diagnóstico de doença sexualmente transmissível (DST)?
    q18: string; //Já teve tuberculose?
    q19: string; //Já teve uma convulsão ou epilepsia?
    q20: string; //Já teve uma doença autoimune, como lúpus ou artrite reumatoide?
    q21: string; //Já teve um transplante de órgão ou medula óssea?
    q22: string; //Já teve um distúrbio de coagulação do sangue, como hemofilia?
    q23: string; //Já usou drogas intravenosas?
    q24: string; //Já recebeu uma vacinação nas últimas quatro semanas?
}