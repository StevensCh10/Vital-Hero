export type Screening = {
    id: number;
    donor: number;
    doctor: number;
    q1: string; //Ja doou sangue? Há quanto tempo? Sentiu-se mal?
    q2: string; //Tem alergia? A que? Quando foi a ultima crise? Faz tratamento? Qual?
    q3: string; //Já foi operado? Quando? De que? Precisou tomar sangue?
    q4: string; //Tomou alguma vacina recente? Qual?
    q5: string; //Tem ou teve convulsões? Quando?
}