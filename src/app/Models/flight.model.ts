export class Flight {
  Airline: string;
  departureCountry: string;
  departureCity: string;
  departureTime: string;
  arrivalCountry: string;
  arrivalCity: string;
  arrivalTime: string;
  Duration: string;
  Price: string;

  constructor(Airline: string, departureCountry: string, departureCity: string, departureTime: string, arrivalCountry: string, arrivalCity: string, arrivalTime: string, Duration: string, Price: string) {
    this.Airline = Airline;
    this.departureCountry = departureCountry;
    this.departureCity = departureCity;
    this.departureTime = departureTime;
    this.arrivalCountry = arrivalCountry;
    this.arrivalCity = arrivalCity;
    this.arrivalTime = arrivalTime;
    this.Duration = Duration;
    this.Price = Price;
  }
}
