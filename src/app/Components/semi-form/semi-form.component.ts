import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Flight} from '../../Models/flight.model';
import {Router} from '@angular/router';
import {FlightService} from '../../Services/Flight/flight.service';
import {DataService} from '../../Services/Data/data.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {SearchWidget} from '../SearchWidget';
import {HotelService} from '../../Services/Hotel/hotel.service';

@Component({
  selector: 'app-semi-form',
  templateUrl: './semi-form.component.html',
  styleUrls: ['./semi-form.component.css']
})
export class SemiFormComponent implements OnInit, AfterViewInit {
  multicityCheckBox = false;
  Source: string;
  sourceCountry: string;
  Destination: string;
  destinationCountry: string;
  objects: any[];
  @Input() paddingFlag: boolean;
  NoFlightData = false;
  countryCode: string;
  public sourceSearchWidget = new SearchWidget();
  public destinationSearchWidget = new SearchWidget();
  public Listname_1;
  public Listname_2;
  private map = new Map<string, string>();

  constructor(private spinner: NgxSpinnerService, private flightService: FlightService, private dataService: DataService, private hotelService: HotelService, private router: Router) {
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

  submit(f) {
    console.log('semiForm' + JSON.stringify(f.value));
    this.spinner.show();

    this.Source = f.value.source.split(',')[1];
    // console.log('Source is:' + this.Source);
    this.Destination = f.value.destination.split(',')[1];
    this.sourceCountry = this.map.get(this.Source);
    this.destinationCountry = this.map.get(this.Destination);


    this.hotelService.findCountryCode(this.sourceCountry).valueChanges().subscribe(
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

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
