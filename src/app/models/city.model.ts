export class City {
    key: number;
    name: string;
    country: string;
    isFav: boolean
    constructor(_key: number, _name: string, _country: string) {
        this.key = _key;
        this.name = _name;
        this.country = _country;
        this.isFav = false;
    }
}
