import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Hotel} from '../../Models/Hotel.model';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {HotelDetail} from '../../Models/HotelDetail.model';

@Injectable()
export class HotelService {
  IdaArray = [];
  conString;
  hotelbody = null;
  private transformedHotels: HotelDetail[] = [];

  constructor(public http: Http, private db: AngularFireDatabase) {
  }

  GetHotels(cityName: string, countryCode: string) {
    const url2 = 'https://api-crt.cert.havail.sabre.com/v1.0.0/shop/hotels/content?mode=content';
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer T1RLAQL//ep7XqGoYWwrhSL53WfzKe3seBA0EaI/9vVaHNLuoNCJCUMyAADAAlBm9uE8Fj4GCXrgBX3bdeyyEH0bD6Aoj6G01ttnuuWFeIcCY978EPI2oNkz8MR74Hd1ldmxeGojDlhRYokhZZF+CyyLg/LeuTfAOfAr8nRGf3K4Ltt9X1dSgki4m35K8aarNlnKA8ZCxB7fAK0DNeWUjWVyFmxxYguDtRg+3RwxgNVrE4I9Al5TJbsyNg2BPrOuZPc57nzKlS2HIsfvsOWqNt5mcnLUBmhSciIqHd2ISNo4dDBU4AwGTwnWRsne'
    });
    return this.http.post(url2, this.hotelbody, {headers: headers})
      .map((response: Response) => {
        const getHotels = response.json()['GetHotelContentRS']['HotelContentInfos']['HotelContentInfo'];
        for (const hotel of getHotels) {
          const name = hotel['HotelInfo']['HotelName'];
          console.log('HotelID:' + hotel['HotelInfo']['HotelCode']);
          console.log('HotelName:' + name);

          let Image = null;
          if (JSON.stringify(hotel['HotelMediaInfo']) !== undefined && JSON.stringify(hotel['HotelMediaInfo']['ImageItems']) !== undefined && JSON.stringify(hotel['HotelMediaInfo']['ImageItems']) !== '{}') {
            Image = hotel['HotelMediaInfo']['ImageItems']['ImageItem'][0]['Images']['Image'][0]['Url'];
            console.log('HotelImage:' + Image);
          }
          let Description = 'No Description';
          if (JSON.stringify(hotel['HotelDescriptiveInfo']['Descriptions']) !== undefined && JSON.stringify(hotel['HotelDescriptiveInfo']['Descriptions']['Description']) !== undefined) {
            Description = hotel['HotelDescriptiveInfo']['Descriptions']['Description'][0]['Text']['content'];
            Description = Description.replace(/\n/g, ' ');
            Description = Description.replace(/-/g, '');
            Description = Description.toLowerCase();
            Description = Description.replace(/\b\w/g, l => l.toUpperCase());
            console.log('HotelDescription:' + Description);
          }

          if (Description.length > 20 && Image !== null) {
            this.transformedHotels.push(new HotelDetail(Image, name, Description, 0, '0'));
          }
        }
        return this.transformedHotels;
      })
      .catch((error: Response) => Observable.throw(error));
  }

  findCountryCode(countryName) {
    console.log('_countryName:' + countryName + 'typeof:' + typeof(countryName));
    countryName = 'United States';
    console.log('_countryName_' + countryName + 'typeof:' + typeof(countryName));
    return this.db.list('/Country', ref => ref.orderByChild('name').limitToFirst(1).equalTo(countryName));
    // return null;
  }

  GetHotelsIDs(cityName: string, countryCode: string) {
    const GeoSearchbody = '{"GeoSearchRQ": {"version": "1","GeoRef": {"Category": "HOTEL","AddressRef": {"City":' + cityName + ',"CountryCode":' + countryCode + '},"Radius": 20,"UOM": "MI"}}}';
    const url1 = 'https://api-crt.cert.havail.sabre.com/v1.0.0/lists/utilities/geosearch/locations?mode=geosearch';
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer T1RLAQL//ep7XqGoYWwrhSL53WfzKe3seBA0EaI/9vVaHNLuoNCJCUMyAADAAlBm9uE8Fj4GCXrgBX3bdeyyEH0bD6Aoj6G01ttnuuWFeIcCY978EPI2oNkz8MR74Hd1ldmxeGojDlhRYokhZZF+CyyLg/LeuTfAOfAr8nRGf3K4Ltt9X1dSgki4m35K8aarNlnKA8ZCxB7fAK0DNeWUjWVyFmxxYguDtRg+3RwxgNVrE4I9Al5TJbsyNg2BPrOuZPc57nzKlS2HIsfvsOWqNt5mcnLUBmhSciIqHd2ISNo4dDBU4AwGTwnWRsne'
    });
    console.log('Hello1');
    return this.http.post(url1, GeoSearchbody, {headers: headers})
      .map((response: Response) => {
//        console.log('Kr lo kaam  BC!!!');
        console.log('Hello3');
        this.conString = '';
        const getHotelsID = response.json()['GeoSearchRS']['GeoSearchResults']['GeoSearchResult'];
        for (const hotelID of getHotelsID) {
          let tmp1 = '{"HotelCode":"';
          tmp1 = tmp1 + hotelID['Id'] + '"},';
          if (hotelID['Id'] !== undefined) {
            this.IdaArray.push(hotelID['Id']);
          }
          this.conString = this.conString + tmp1;
        }
        this.conString = this.conString.substring(0, this.conString.length - 1);
        this.hotelbody = '{"GetHotelContentRQ":{"SearchCriteria":{"HotelRefs":{"HotelRef":[' + this.conString + ']},"DescriptiveInfoRef":{"PropertyInfo":false,"LocationInfo":false,"Amenities":false,"Descriptions":{"Description":[{"Type":"Dining"},{"Type":"Alerts"}]},"Airports":false,"AcceptedCreditCards":false},"ImageRef":{"MaxImages":"10"}}}}';
        console.log(this.conString);
      })
      .catch((error: Response) => Observable.throw(error));
  }

  GetHotel(hotel: Hotel) {

    let tmp2 = '';
    for (let i = 0; i < 40; i++) {
      const tmp = '{"Image":"/assets/images/hotel.png","Name":"Hilton Paris","Description":"Hilton Hotels & Resorts is a global brand of full-service hotels and resorts and the flagship brandof Hilton. The original company was founded by Conrad Hilton. As of 2017, there were more than 570Hilton Hotels & Resorts properties in 85 countries and te","Rating":3,"No_of_Rating":"28456"},';
      tmp2 = tmp2 + tmp;
    }
    tmp2 = tmp2.substring(0, tmp2.length - 1);
    const json = '[' + tmp2 + ']';


    console.log(json);
    return JSON.parse(json);
    // return this.http.post('http://localhost:3000/app/flights', body, {headers: headers})
    //   .map((response: Response) => response.json())
    //   .catch((error: Response) => Observable.throw(error.json()));
  }
}
