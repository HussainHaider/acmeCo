import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {CarDetail} from '../../Models/CarDetail.model';
import {HotelDetail} from '../../Models/HotelDetail.model';

@Injectable()
export class CarService {
  private transformedCars: CarDetail[] = [];
  constructor(public http: Http) {
  }

  GetCar2() {

    let tmp2 = '';
    for (let i = 0; i < 40; i++) {
      const tmp = '{"Image":"/assets/images/car.png","Name":"Range Rover Sport 2017","Description":"The Land Rover Range Rover Sport is a British luxury mid-size SUV made by Land Rover. The first generation (codename: L320) started production in 2004, and was replaced by the second generation Sport (codename: L494) in 2013.","Price":"250$"},';
      tmp2 = tmp2 + tmp;
    }
    tmp2 = tmp2.substring(0, tmp2.length - 1);
    const json = '[' + tmp2 + ']';



    console.log(JSON.parse(json));
    return JSON.parse(json);
    // return this.http.post('http://localhost:3000/app/flights', body, {headers: headers})
    //   .map((response: Response) => response.json())
    //   .catch((error: Response) => Observable.throw(error.json()));
  }

  GetCar(LocationCode: string, PickUpDateTime: string, ReturnDateTime: string) {
    const SearchBody = '{"OTA_VehAvailRateRQ":{"VehAvailRQCore":{"QueryType":"Shop","VehRentalCore":{"PickUpDateTime":' + '"' + PickUpDateTime + '"' + ',"ReturnDateTime":' + '"' + ReturnDateTime + '"' + ',"PickUpLocation":{"LocationCode":' + LocationCode + '}}}}}';
    const url = 'https://api-crt.cert.havail.sabre.com/v2.4.0/shop/cars';
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer T1RLAQL//ep7XqGoYWwrhSL53WfzKe3seBA0EaI/9vVaHNLuoNCJCUMyAADAAlBm9uE8Fj4GCXrgBX3bdeyyEH0bD6Aoj6G01ttnuuWFeIcCY978EPI2oNkz8MR74Hd1ldmxeGojDlhRYokhZZF+CyyLg/LeuTfAOfAr8nRGf3K4Ltt9X1dSgki4m35K8aarNlnKA8ZCxB7fAK0DNeWUjWVyFmxxYguDtRg+3RwxgNVrE4I9Al5TJbsyNg2BPrOuZPc57nzKlS2HIsfvsOWqNt5mcnLUBmhSciIqHd2ISNo4dDBU4AwGTwnWRsne'
    });
    return this.http.post(url, SearchBody, {headers: headers})
      .map((response: Response) => {
        const getCar = response.json()['OTA_VehAvailRateRS']['VehAvailRSCore']['VehVendorAvails']['VehVendorAvail'];
        for (const Car of getCar) {
          const Image = null;
          const name = Car['Vendor']['CompanyShortName'];
          console.log('name' + name);
          const Description = 'No Description';
          const Price = Car['VehAvailCore']['VehicleCharges']['VehicleCharge']['TotalCharge']['Amount'];
          console.log('Price' + Price);
          this.transformedCars.push(new CarDetail(Image, name, Description, Price));
        }
        return this.transformedCars;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
