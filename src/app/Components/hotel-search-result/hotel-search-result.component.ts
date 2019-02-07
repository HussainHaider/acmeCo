import {Component, OnInit} from '@angular/core';
import {DataService} from '../../Services/Data/data.service';

@Component({
  selector: 'app-hotel-search-result',
  templateUrl: './hotel-search-result.component.html',
  styleUrls: ['./hotel-search-result.component.css']
})
export class HotelSearchResultComponent implements OnInit {
  Sort = ['Duration', 'Airlines'];
  iterations = [1, 2];
  OptionSelected;
  collection = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.collection = this.dataService.data_things;
    console.log('Getting Data', this.listToMatrix(this.collection, 3));
    this.collection = this.listToMatrix(this.collection, 3);
  }

  getRepeater(ratingTotal) {
    return new Array(ratingTotal);
  }

  listToMatrix(list, elementsPerSubArray) {
    const matrix = [];
    let i;
    let k;

    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        matrix[k] = [];
      }

      matrix[k].push(list[i]);
    }
    return matrix;
  }

  onOptionsSelected(event) {
  }
}
