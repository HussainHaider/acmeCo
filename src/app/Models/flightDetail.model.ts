export class FlightDetail {
  Airline: string;
  departureCity: string;
  departureTime: string;
  Arrival: string;
  ArrivalTime: string;
  Duration: string;
  Price: string;

  constructor(Airline: string, departureCity: string, departureTime: string, Arrival: string, ArrivalTime: string, Duration: string, Price: string) {
    this.Airline = Airline;
    this.departureCity = departureCity;
    this.departureTime = departureTime;
    this.Arrival = Arrival;
    this.ArrivalTime = ArrivalTime;
    this.Duration = Duration;
    this.Price = Price;
  }
}
