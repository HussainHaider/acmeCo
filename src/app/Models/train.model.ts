export class Train {
  origin_name: string;
  destination_name: string;
  ArrivalTime: string;
  departureTime: string;
  Duration: string;
  LowestPrice: string;
  Price: string;

  constructor(origin_name: string, destination_name: string, ArrivalTime: string, departureTime: string, Duration: string, LowestPrice: string, Price: string) {
    this.origin_name = origin_name;
    this.destination_name = destination_name;
    this.ArrivalTime = ArrivalTime;
    this.departureTime = departureTime;
    this.Duration = Duration;
    this.LowestPrice = LowestPrice;
    this.Price = Price;
  }
}
