export class City {
    key: number;
    name: string;
    country: string;
    isFav: boolean
    constructor(data: any) {
        this.key = data.ParentCity.Key
        this.name = data.ParentCity.LocalizedName
        this.country = data.Country.LocalizedName
        this.isFav = false;
    }
}
