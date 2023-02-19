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
    constructor(data:any) {
        this.localTime = data[0].LocalObservationDateTime;
        this.icon = {
            url: data[0].WeatherIcon,
            text: data[0].WeatherText,
        };
        this.temperature = {
            metric: data[0].Temperature.Metric.Value,
            imperial: data[0].Temperature.Imperial.Value,
        };
    }
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
    constructor(data: any) {
        this.date = data.Date;
        this.temperature = {
            minVal: data.Temperature.Minimum.Value,
            maxVal: data.Temperature.Maximum.Value,
        };
        this.day = {
            url: data.Day.Icon,
            text: data.Day.IconPhrase,
        };
        this.night = {
            url: data.Night.Icon,
            text: data.Night.IconPhrase,
        };
    }
}
