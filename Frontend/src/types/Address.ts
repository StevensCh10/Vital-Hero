export type Address = {
    id?: number | null,
    cep: string,
    street?: string, 
    additionalInfo?: string, 
    neighborhood?: string, 
    city?: string, 
    stateCode?: string, 
    state?: string, 
    region?: string;
}