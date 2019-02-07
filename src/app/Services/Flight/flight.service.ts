import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Flight} from '../../Models/flight.model';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';


@Injectable()
export class FlightService {

  private dbPath = '/AirPortData';
  objects: any[];
  private transformedFlights: Flight[] = [];
  public Source;
  public sourceCountry;
  public Destination;
  public destinationCountry;
  public dept_date;
  public return_date;
  tranctions: AngularFireList<any> = null;
  dbPath2 = '/Payment';
  constructor(public http: Http, private db: AngularFireDatabase) {
    this.tranctions = db.list(this.dbPath2);
  }

  GetFlights() {

    this.Source = this.Source.replace(/['"]+/g, '');
    this.Destination = this.Destination.replace(/['"]+/g, '');
    const url = 'https://api-crt.cert.havail.sabre.com/v1/shop/flights?origin=' + this.Source + '&destination=' + this.Destination + '&departuredate=' + this.dept_date + '&returndate=' + this.return_date + '&onlineitinerariesonly=N&limit=10&offset=1&eticketsonly=N&sortby=totalfare&order=asc&sortby2=departuretime&order2=asc&pointofsalecountry=US';
    console.log('URL is:' + url);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer T1RLAQL//ep7XqGoYWwrhSL53WfzKe3seBA0EaI/9vVaHNLuoNCJCUMyAADAAlBm9uE8Fj4GCXrgBX3bdeyyEH0bD6Aoj6G01ttnuuWFeIcCY978EPI2oNkz8MR74Hd1ldmxeGojDlhRYokhZZF+CyyLg/LeuTfAOfAr8nRGf3K4Ltt9X1dSgki4m35K8aarNlnKA8ZCxB7fAK0DNeWUjWVyFmxxYguDtRg+3RwxgNVrE4I9Al5TJbsyNg2BPrOuZPc57nzKlS2HIsfvsOWqNt5mcnLUBmhSciIqHd2ISNo4dDBU4AwGTwnWRsne'
    });

    console.log('temp1');
    return this.http.get(url, {headers: headers})
      .map((response: Response) => {
        const getflights = response.json()['PricedItineraries'];
        // console.log('Flights' + JSON.stringify(getflights));
        for (const flight of getflights) {
          let Dept_Time = flight['AirItinerary']['OriginDestinationOptions']['OriginDestinationOption'][1]['FlightSegment'][0]['DepartureDateTime'];

          Dept_Time = Dept_Time.split('T')[1];
          let Arrival_Time = flight['AirItinerary']['OriginDestinationOptions']['OriginDestinationOption'][1]['FlightSegment'][0]['ArrivalDateTime'];
          Arrival_Time = Arrival_Time.split('T')[1];

          const Airline = flight['AirItinerary']['OriginDestinationOptions']['OriginDestinationOption'][1]['FlightSegment'][0]['OperatingAirline']['Code'];
          const Price = flight['AirItineraryPricingInfo']['ItinTotalFare']['TotalFare']['Amount'];
          const hourDiff = Dept_Time - Arrival_Time;
          this.transformedFlights.push(new Flight(Airline, this.sourceCountry, this.Source, Dept_Time, this.destinationCountry, this.Destination, Arrival_Time, '7h 54m'.toString(), Price));
        }
        return this.transformedFlights;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  GetFlightsHistory() {
    const headers = new Headers({'Content-Type': 'application/json'});
    const json = '[{"Airline": "/assets/images/delta.png","departureCity": "New York City,USA",' +
      '"departureTime": "LGA 06:46","ArrivalCity": "San Jose,CA,USA","ArrivalTime": ' +
      '"JFK 23:30","Duration": "7h 54m","Price": "450"},{"Airline": "/assets/images/delta.png",' +
      '"departureCity": "New York City,USA","departureTime": "LGA 06:46","ArrivalCity": "San Jose,CA,USA",' +
      '"ArrivalTime": "JFK 23:30","Duration": "7h 54m","Price": "450"}]';
    console.log(JSON.parse(json));
    return JSON.parse(json);
    // return this.http.post('http://localhost:3000/app/flights', body, {headers: headers})
    //   .map((response: Response) => response.json())
    //   .catch((error: Response) => Observable.throw(error.json()));
  }

  findAirCode(start) {
    return this.db.list('/AirPortData', ref => ref.orderByChild('City').limitToFirst(5).startAt(start));
  }

  GetAirline(str) {
    const url = 'https://api-crt.cert.havail.sabre.com/v1/lists/utilities/airlines?airlinecode=' + str;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer T1RLAQL//ep7XqGoYWwrhSL53WfzKe3seBA0EaI/9vVaHNLuoNCJCUMyAADAAlBm9uE8Fj4GCXrgBX3bdeyyEH0bD6Aoj6G01ttnuuWFeIcCY978EPI2oNkz8MR74Hd1ldmxeGojDlhRYokhZZF+CyyLg/LeuTfAOfAr8nRGf3K4Ltt9X1dSgki4m35K8aarNlnKA8ZCxB7fAK0DNeWUjWVyFmxxYguDtRg+3RwxgNVrE4I9Al5TJbsyNg2BPrOuZPc57nzKlS2HIsfvsOWqNt5mcnLUBmhSciIqHd2ISNo4dDBU4AwGTwnWRsne'
    });

    console.log('temp1');
    return this.http.get(url, {headers: headers})
      .map((response: Response) => {
        let AirlineName = null;
        console.log('Airline:' + response.json()['AirlineInfo'][0]['AlternativeBusinessName']);
        return AirlineName = response.json()['AirlineInfo'][0]['AlternativeBusinessName'];
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  setValues(Source, sourceCountry, Destination, destinationCountry, dept_date, return_date) {
    this.Source = Source;
    this.sourceCountry = sourceCountry;
    this.Destination = Destination;
    this.destinationCountry = destinationCountry;
    this.dept_date = dept_date;
    this.return_date = return_date;
    console.log('sourceCountry is:' + this.sourceCountry);
    console.log('destinationCountry is:' + this.destinationCountry);
  }

  addPayment(value: string, Class: string) {
    this.tranctions.push({
      UserId: localStorage.getItem('userId'),
      personalFlight: value,
      BusinessTrips: value
    });
  }
}
