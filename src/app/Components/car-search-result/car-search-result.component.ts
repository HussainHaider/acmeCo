import {Component, OnInit} from '@angular/core';
import {DataService} from '../../Services/Data/data.service';

@Component({
  selector: 'app-car-search-result',
  templateUrl: './car-search-result.component.html',
  styleUrls: ['./car-search-result.component.css']
})
export class CarSearchResultComponent implements OnInit {


  iterations = [1, 2, 3];

  collection = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.collection = this.dataService.data_things;
    console.log('Getting Data', this.collection);
  }
}
