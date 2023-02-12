export class CurrentWeather {
    localTime!: string;
    icon!: {
        url: string;
        text: string;
    }
    temperature!: {
        metric:number,
        imperial:number,
    };
}

export class ForecastWeather {
    date!: string;
    temperature!: {
        minVal:number,
        maxVal:number,
    };
    day!: {
        url: string;
        text: string;
    }
    night!: {
        url: string;
        text: string;
    }
}

