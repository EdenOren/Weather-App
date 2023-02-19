export class City {
    key: number;
    name: string;
    country: string;
    isFav: boolean
    constructor(data: any) {
        this.key = data.Key
        this.name = data.LocalizedName
        this.country = data.Country.LocalizedName
        this.isFav = false;
    }
}
