import { Kedvezemenyek } from "./Kedvezmenyek";

export interface Jegy {
    id?: string; 
    honnanan: string;
    hova: string;
    datum: string;
    utasSzam: number; 
    kedvezmenyek: Kedvezemenyek;
}