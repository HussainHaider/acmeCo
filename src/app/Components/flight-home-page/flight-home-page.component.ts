import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-flight-home-page',
  templateUrl: './flight-home-page.component.html',
  styleUrls: ['./flight-home-page.component.css']
})
export class FlightHomePageComponent implements OnInit {
  comp = 'homepage';
  multicityCheckBox = false;
  flagCheck = false;

  constructor() {
  }

  ngOnInit() {
  }

}
