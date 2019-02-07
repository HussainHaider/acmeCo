export class Hotel {
  Destination: string;
  Passengers: string;
  deptDate: string;
  returnDate: string;

  constructor(Destination: string, Passengers: string, deptDate: string, returnDate: string) {
    this.Destination = Destination;
    this.Passengers = Passengers;
    this.deptDate = deptDate;
    this.returnDate = returnDate;
  }
}
