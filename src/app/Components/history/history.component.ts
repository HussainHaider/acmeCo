import {Component, OnInit} from '@angular/core';
import {DataService} from '../../Services/Data/data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  Sort = ['Duration', 'Airlines'];
  history = ['1', '2', '3', '4', '5', '6', '7'];
  collection = [];
  OptionSelected;
  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.collection = this.dataService.data_things;
    console.log('Getting Data', this.collection);
  }

  onOptionsSelected(event) {
  }
}
