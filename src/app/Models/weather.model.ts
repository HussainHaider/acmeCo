export class Weather {
  temperature: string;
  description: string;
  Wind: string;
  Humidity: string;
  Pressure: string;
  cityName: string;
  countryCode: string;

  constructor(temperature: string, description: string, Wind: string, Humidity: string, Pressure: string, cityName: string, countryCode: string) {
    this.temperature = temperature;
    this.description = description;
    this.Wind = Wind;
    this.Humidity = Humidity;
    this.Pressure = Pressure;
    this.cityName = cityName;
    this.countryCode = countryCode;
  }
}
