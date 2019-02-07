import {Component, OnInit} from '@angular/core';
import {DataService} from '../../Services/Data/data.service';
import {FlightService} from '../../Services/Flight/flight.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  Sort = ['Duration', 'Airlines'];
  history = ['1', '2', '3', '4', '5', '6', '7'];
  step = 0;
  somePriceRange = [0, 15000];
  maxPrice = 15000;
  minPrice = 0;

  someTimeRange = [0, 12];
  maxTime = 12;
  minTime = 0;

  fliters = false;
  collection = [];
  dbtimeslots = [];
  OptionSelected;
  constructor(private dataService: DataService, private flightService: FlightService) {
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.collection = this.dataService.data_things;
    for (let i = 0; i < this.collection.length; i++) {
      this.flightService.GetAirline(this.collection[i]['Airline'])
        .subscribe(
          data => {
            console.log('AirLine is:' + data);
            this.collection[i]['Airline'] = data;
          },
          error => console.error(error)
        );
    }
    console.log('Getting Data', this.collection);
    this.dbtimeslots = this.collection;
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onChangePrice(value) {
    console.log('Value of slider changed to', value);
    this.maxPrice = value[1];
    this.minPrice = value[0];
    const coll = [];
    this.collection = this.dbtimeslots;
    for (let i = 0; i < this.collection.length; i++) {
      if (this.collection[i].Price > this.minPrice && this.collection[i].Price < this.maxPrice) {
        coll.push(this.collection[i]);
      }
    }
    if (this.maxPrice.toString() === '15000' && this.minPrice.toString() === '0') {
      this.collection = this.dbtimeslots;
    } else {
      this.collection = coll;
    }
  }

  onChangeTime(value) {
    this.maxTime = value[1];
    this.minTime = value[0];
  }

  Fliters() {
    return this.fliters = !this.fliters;
  }

  Selectoffer(event) {
    console.log('Offer is:' + event);
    this.flightService.addPayment(event.slice(1), 'Personal');
  }

  onOptionsSelected(event) {
  }
}
