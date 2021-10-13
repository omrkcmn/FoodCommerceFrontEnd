import { Byte } from "@angular/compiler/src/util";

export interface User{
    id:number;
    kullaniciAdi:string;
    kullaniciSoyadi:string;
    adres:string;
    il:string;
    ilce:string;
    telefon:string;
    email:string;
    passwordSalt:Byte[];
    passwordHash:Byte[];
    restoranId:number
}