import {AfterViewInit, Component, HostListener, OnChanges, OnInit} from '@angular/core';
import {Flight} from '../../Models/flight.model';
import {DataService} from '../../Services/Data/data.service';
import {Router} from '@angular/router';
import {FlightService} from '../../Services/Flight/flight.service';
import {Hotel} from '../../Models/Hotel.model';
import {HotelService} from '../../Services/Hotel/hotel.service';
import {CarService} from '../../Services/Car/car.service';
import {TrainService} from '../../Services/Train/train.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {SearchWidget} from '../SearchWidget';

export interface IHash {
  [details: string]: string;
}
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, AfterViewInit {
  comp = 'homepage';

  flightFlagCheck = true;
  flightImage = '/assets/images/planeTab_.png';
  bedFlagCheck = false;
  bedImage = '/assets/images/bed.png';
  carFlagCheck = false;
  carImage = '/assets/images/carCompact.png';
  trainFlagCheck = false;
  trainImage = '/assets/images/beach.png';
  heading = 'Find cheapest tickets to your next big  destination.';
  paragraph = 'Search for hotels, cars or check in your next trip in one place.';
  ispara = true;
  objects: any[];
  countryName: string;
  cityName: string;
  countryCode: string;
  LocationCode: string;
  Source: string;
  sourceCountry: string;
  Destination: string;
  destinationCountry: string;
  NoFlightData = false;
  NoHotelData = false;
  NoCarData = false;
  NoTrainData = false;
  public sourceSearchWidget = new SearchWidget();
  public destinationSearchWidget = new SearchWidget();
  public Listname_1;
  public Listname_2;
  private map = new Map<string, string>();
  constructor(private spinner: NgxSpinnerService, private flightService: FlightService, private hotelService: HotelService, private carService: CarService, private trainService: TrainService, private dataService: DataService, private router: Router) {
  }
  ngOnInit() {
    this.Listname_1 = 'browsers_1';
    this.Listname_2 = 'browsers_2';
  }

  ngAfterViewInit() {
    const HTML_1 = '<datalist id=\'browsers_1\'' + '>' + '</datalist>';
    const HTML_2 = '<datalist id=\'browsers_2\'' + '>' + '</datalist>';

    document.getElementById('myForm_1').insertAdjacentHTML('beforeend', HTML_1);
    document.getElementById('myForm_2').insertAdjacentHTML('beforeend', HTML_2);
  }

  flightBtnClicked() {

    this.flightFlagCheck = true;
    this.bedFlagCheck = false;
    this.carFlagCheck = false;
    this.trainFlagCheck = false;
    this.imageChange();
    this.heading = 'Find cheapest tickets to your next big  destination.';
  }

  bedBtnClicked() {
    this.flightFlagCheck = false;
    this.bedFlagCheck = true;
    this.carFlagCheck = false;
    this.trainFlagCheck = false;
    this.imageChange();
    this.heading = 'Check out best hotels to  stay in at your next adventure.';
  }

  carBtnClicked() {
    this.flightFlagCheck = false;
    this.bedFlagCheck = false;
    this.carFlagCheck = true;
    this.trainFlagCheck = false;
    this.imageChange();
    this.heading = 'Most secure  way of going  around in less  known cities.';
  }

  trainBtnClicked() {
    this.flightFlagCheck = false;
    this.bedFlagCheck = false;
    this.carFlagCheck = false;
    this.trainFlagCheck = true;
    this.imageChange();
    this.heading = 'Old fashioned  travelling? Book  your next train  ticket here.';
  }

  imageChange() {
    if (this.flightFlagCheck) {
      this.flightImage = '/assets/images/planeTab_.png';
    } else {
      this.flightImage = '/assets/images/planeTab.png';
    }

    if (this.bedFlagCheck) {
      this.bedImage = '/assets/images/bed_.png';
    } else {
      this.bedImage = '/assets/images/bed.png';
    }

    if (this.carFlagCheck) {
      this.carImage = '/assets/images/carCompact_.png';
    } else {
      this.carImage = '/assets/images/carCompact.png';
    }

    if (this.trainFlagCheck) {
      this.trainImage = '/assets/images/underground.png';
    } else {
      this.trainImage = '/assets/images/beach.png';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log('Iwidth is' + event.target.innerWidth);
    if (event.target.innerWidth < 770) {
      this.ispara = false;
    } else {
      this.ispara = true;
    }
  }

  submit(f) {
    console.log('semiForm' + JSON.stringify(f.value));
    this.spinner.show();
    if (this.flightFlagCheck) {
      this.Source = f.value.source.split(',')[1];
      // console.log('Source is:' + this.Source);
      this.Destination = f.value.destination.split(',')[1];
      this.sourceCountry = this.map.get(this.Source);
      this.destinationCountry = this.map.get(this.Destination);


      this.hotelService.findCountryCode(this.countryName).valueChanges().subscribe(
        data => {
          this.objects = data;
          console.log('Object:' + this.objects);
          this.countryCode = JSON.stringify(this.objects[0]['code']);
          this.sourceCountry = f.value.source.split(',')[0] + ',';
          this.countryCode = this.countryCode.replace(/['"]+/g, '');
          this.sourceCountry += this.countryCode;
          console.log('sourceCountry is:' + this.sourceCountry);

          this.destinationCountry = f.value.destination.split(',')[0] + ',';
          this.destinationCountry += this.countryCode;
          // console.log('destinationCountry is:' + this.destinationCountry);

          this.flightService.setValues(this.Source, this.sourceCountry, this.Destination, this.destinationCountry, f.value.dept_date, f.value.return_date);

          this.flightService.GetFlights()
            .subscribe(
              data2 => {
                console.log('Data:' + JSON.stringify(data2));
                this.dataService.data_things = JSON.stringify(data2);
                this.spinner.hide();
                this.NoFlightData = false;
                this.router.navigateByUrl('/SearchResults');
              },
              error => {
                console.error('Error:' + error);
                this.NoFlightData = true;
                this.spinner.hide();
              }
            );
        });
    } else if (this.bedFlagCheck) {
      const hotel = new Hotel(
        f.value.destination, f.value.passenger, f.value.dept_date, f.value.return_date);
      this.hotelService.GetHotels(this.cityName, this.countryCode)
        .subscribe(
          data => {
            console.log('Data:' + JSON.stringify(data));
            this.dataService.data_things = JSON.stringify(data);
            this.spinner.hide();
            this.NoHotelData = false;
            this.router.navigateByUrl('/HotelSearch');
          },
          error => {
            console.error(error);
            this.NoHotelData = true;
            this.spinner.hide();
          }
        );
    } else if (this.carFlagCheck) {
      let year = f.value.arrival_date.split('-')[0];
      let month = f.value.arrival_date.split('-')[1];
      let date = month + '-' + year.slice(2);
      const PickUpDateTime = date + 'T' + f.value.arrival_Time;
      console.log('PickUpDateTime' + PickUpDateTime);

      year = f.value.return_date.split('-')[0];
      month = f.value.return_date.split('-')[1];
      date = month + '-' + year.slice(2);
      const ReturnDateTime = date + 'T' + f.value.return_Time;
      console.log('ReturnDateTime' + ReturnDateTime);
      console.log('LocationCode' + this.LocationCode);
      this.carService.GetCar(this.LocationCode, PickUpDateTime, ReturnDateTime).subscribe(
        data => {
          console.log('Data:' + JSON.stringify(data));
          this.dataService.data_things = JSON.stringify(data);
          this.NoCarData = false;
          this.spinner.hide();
          this.router.navigateByUrl('/CarSearch');
        },
        error => {
          console.error(error);
          this.NoCarData = true;
          this.spinner.hide();
        }
      );
    } else if (this.trainFlagCheck) {
      this.trainService.getStationCode(f.value.departStation).subscribe(
        collect => {
          this.trainService.GetTrain().subscribe(
            data => {
              this.dataService.data_things = JSON.stringify(data);
              this.NoTrainData = false;
              this.spinner.hide();
              this.router.navigateByUrl('/TrainSearch');
            },
            error => {
              console.error(error);
              this.NoTrainData = true;
              this.spinner.hide();
            });
        },
        error => {
          console.error(error);
          this.spinner.hide();
        });

      // const data = this.trainService.GetTrain2();
      // this.dataService.data_things = JSON.stringify(data);
      // this.router.navigateByUrl('/TrainSearch');
    }

  }

  searchCode($event) {
    console.log('event:' + $event.target.value);
    let queryText = $event.target.value;
    queryText = this.capitalizeFirstLetter(queryText);
    this.flightService.findAirCode(queryText).valueChanges().subscribe(
      objects => {
        this.objects = objects;
        this.countryName = JSON.stringify(this.objects[0]['Country']);
        this.cityName = JSON.stringify(this.objects[0]['City']);
//        this.countryName = this.countryName.toString();
        console.log('countryName' + this.countryName + 'typeof' + typeof(this.countryName));
        this.hotelService.findCountryCode(this.countryName).valueChanges().subscribe(
          data => {
            this.objects = data;
            console.log('Object:' + this.objects);
            this.countryCode = JSON.stringify(this.objects[0]['code']);
            console.log('countryCode' + this.countryCode);
            this.hotelService.GetHotelsIDs(this.cityName, this.countryCode).subscribe(
              data2 => {
              },
              error => console.error(error)
            );
          });
      });
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  searchCityode($event) {
    console.log('event:' + $event.target.value);
    let queryText = $event.target.value;
    queryText = this.capitalizeFirstLetter(queryText);
    this.flightService.findAirCode(queryText).valueChanges().subscribe(
      objects => {
        this.objects = objects;
        this.LocationCode = JSON.stringify(this.objects[0]['IATA']);
        console.log('LocationCode' + this.LocationCode);
      });
  }

  searchSource($event) {
    console.log('event:' + $event.target.value);
    let queryText = $event.target.value;
    queryText = this.capitalizeFirstLetter(queryText);
    this.flightService.findAirCode(queryText).valueChanges().subscribe(
      objects => {
        this.objects = objects;
        console.log('Source' + JSON.stringify(this.objects));

        for (let i = 0; i < this.objects.length; i++) {

          let city = JSON.stringify(this.objects[i]['City']);
          city = city.replace(/['"]+/g, '');
          let IATA = JSON.stringify(this.objects[i]['IATA']);
          IATA = IATA.replace(/['"]+/g, '');
          const Country = JSON.stringify(this.objects[i]['Country']);
          this.map.set(IATA, Country);
          const list = '\'' + city + ',' + IATA + '\'';
          this.sourceSearchWidget.countryList.push(list);
        }
      });
    document.getElementById('browsers_1').innerHTML = '';
    const html = this.sourceSearchWidget.render(queryText);
    if (html !== undefined) {
      document.getElementById('browsers_1').insertAdjacentHTML('beforeend', html.toString());
    }
    this.sourceSearchWidget.clearSet();
  }

  searchDestination($event) {
    console.log('event:' + $event.target.value);
    let queryText = $event.target.value;
    queryText = this.capitalizeFirstLetter(queryText);
    this.flightService.findAirCode(queryText).valueChanges().subscribe(
      objects => {
        this.objects = objects;
        for (let i = 0; i < this.objects.length; i++) {

          let city = JSON.stringify(this.objects[i]['City']);
          city = city.replace(/['"]+/g, '');
          let IATA = JSON.stringify(this.objects[i]['IATA']);
          IATA = IATA.replace(/['"]+/g, '');
          const Country = JSON.stringify(this.objects[i]['Country']);
          this.map.set(IATA, Country);
          const list = '\'' + city + ',' + IATA + '\'';
          this.destinationSearchWidget.countryList.push(list);
        }
      });
    document.getElementById('browsers_2').innerHTML = '';
    const html = this.destinationSearchWidget.render(queryText);
    if (html !== undefined) {
      document.getElementById('browsers_2').insertAdjacentHTML('beforeend', html.toString());
    }
    this.destinationSearchWidget.clearSet();
  }

}
