export interface User {
    id: string;
    nev: {
        vezeteknev: string;
        keresztnev: string;
    }
    
    email: string;
    Megvett?: string[];
    kosar?: string[];
}