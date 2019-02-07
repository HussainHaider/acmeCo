import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Train} from '../../Models/train.model';

@Injectable()
export class TrainService {
  station_code;
  private transformedTrains: Train[] = [];
  constructor(public http: Http) {
  }

  GetTrain2() {

    const headers = new Headers({'Content-Type': 'application/json'});
    const json = '[{"Source":"London Euston","SourceTime":"8:00 AM","Destination":"Manchester Piccadilly","DestinationTime":"8:00 AM","Time":"2h 4min","Lowest_Price":"250$","Price":"250$"},' +
      '{"Source":"London Euston","SourceTime":"8:00 AM","Destination":"Manchester Piccadilly","DestinationTime":"8:00 AM","Time":"2h 4min","Lowest_Price":"250$","Price":"250$"},' +
      '{"Source":"London Euston","SourceTime":"8:00 AM","Destination":"Manchester Piccadilly","DestinationTime":"8:00 AM","Time":"2h 4min","Lowest_Price":"250$","Price":"250$"}]';


    console.log(JSON.parse(json));
    return JSON.parse(json);
  }

  getStationCode(station) {
    return this.http.get('http://transportapi.com/v3/uk/places.json?query=' + station + '&type=train_station&app_id=e0d04170&app_key=4db86331fa27a55c2b0718e03d8ad6cf')
      .map((response: Response) => {
        this.station_code = response.json()['member'][0]['station_code'];
        console.log('station_code' + this.station_code);
      })
      .catch((error: Response) => Observable.throw(error));
  }

  GetTrain() {
    console.log('In GetTrain Function');
    return this.http.get('https://transportapi.com/v3/uk/train/station/' + this.station_code + '///timetable.json?app_id=e0d04170&app_key=4db86331fa27a55c2b0718e03d8ad6cf&train_status=passenger')
      .map((response: Response) => {
        const getTrains = response.json()['departures']['all'];
        console.log('Train Data is:' + getTrains);
        for (const train of getTrains) {
          const origin_name = train['origin_name'];
          const destination_name = train['destination_name'];
          const ArrivalTime = train['aimed_arrival_time'];
          const departureTime = train['aimed_departure_time'];
          const Duration = '2h 15min';
          const LowestPrice = 'None';
          const Price = 'None';
          this.transformedTrains.push(new Train(origin_name, destination_name, ArrivalTime, departureTime, Duration, LowestPrice, Price));
        }
        return this.transformedTrains;
      })
      .catch((error: Response) => Observable.throw(error));
  }
}
