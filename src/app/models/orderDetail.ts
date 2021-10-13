export interface OrderDetail{
    id:number
    yemekID: number
    restoranID: number
    kullaniciID: number
    yemekAdi: string
    kullaniciAdi: string
    kullaniciSoyadi: string
    telefon: number
    il: string
    ilce: string
    adres: string
    restoranAdi: string
    siparisTamamlanma: boolean
    fiyat:number
    resim:string
    miktar:number
    siparisDurum:string
}