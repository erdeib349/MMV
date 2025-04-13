import { Kedvezemenyek } from "./Kedvezmenyek";

export interface Jegy {
    honnanan: string;
    hova: string;
    datum: string;
    utasSzam: number;  /* string; ? */
    kedvezmenyek: Kedvezemenyek;
}