import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Weather} from '../../Models/weather.model';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable()
export class DashboardService {
  public weather: Weather;
  dbPath = '/payment';
  collection: AngularFireList<any>;

  constructor(public http: Http, private db: AngularFireDatabase) {
  }

  getWeather(station) {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + station + '&appid=c4e5e8da4bcfecba493ed2dd774e7628')
      .map((response: Response) => {
        const tempDetail = response.json();
        const tempature = this.convertKelvinToCelsius(tempDetail['main']['temp']);
        const Wind = tempDetail['wind']['speed'];
        const Humidity = tempDetail['main']['humidity'];
        const Pressure = tempDetail['main']['pressure'];
        const cityName = tempDetail['name'];
        const countryCode = tempDetail['sys']['country'];
        const description = tempDetail['weather'][0]['description'];
        console.log('description' + tempDetail['weather'][0]['description']);
        return this.weather = new Weather(tempature.toString(), description, Wind, Humidity, Pressure, cityName, countryCode);
      })
      .catch((error: Response) => Observable.throw(error));
  }

  private convertKelvinToCelsius(kelvin) {
    if (kelvin < (0)) {
      return 'below absolute zero (0 K)';
    } else {
      return (kelvin - 273.15).toFixed(2);
    }
  }

  getExpenses() {
    return this.db.list('/Payment', ref => ref.orderByChild('UserId').limitToFirst(1).equalTo(localStorage.getItem('userId')));
  }
}
