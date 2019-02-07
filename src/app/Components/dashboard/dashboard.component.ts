import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {DashboardService} from '../../Services/Dashboard/dashboard.service';
import {ActivatedRoute} from '@angular/router';
import {Weather} from '../../Models/weather.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chart = [];
  myPieChart;
  collection: any;
  collect = [];
  description: string;
  personalFlightRate;
  BusinessTripsRate;
  CityName: string;

  constructor(private router: ActivatedRoute, private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      console.log('PARAMS:', params.get('name'));
      this.CityName = params.get('name');
    });
    this.dashboardService.getWeather(this.CityName).subscribe(
      data => {
        console.log(data);
        this.collection = data;
        this.description = this.collection['description'];
        console.log('this.description:' + this.description);
      },
      error => {
        console.error(error);
      });
    this.dashboardService.getExpenses().valueChanges().subscribe(
      objects => {
        this.personalFlightRate = parseInt(objects[0]['personalFlight']);
        this.BusinessTripsRate = parseInt(objects[0]['BusinessTrips']);
        const total = this.personalFlightRate + this.BusinessTripsRate;
        // console.log('Object data' + total);
        this.personalFlightRate = (this.personalFlightRate / total) * 100;
        this.BusinessTripsRate = (this.BusinessTripsRate / total) * 100;


        this.myPieChart = new Chart('ctx', {
          type: 'pie',
          data: {
            labels: ['personalFlight', 'BusinessTrips', 'upcoming expenses'],
            datasets: [
              {
                label: 'Points',
                backgroundColor: ['#3EC6FF', '#00B1FB', '#0B7AA8'],
                data: [this.personalFlightRate, this.BusinessTripsRate, 0]
              }
            ]
          }
        });
      });
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Previous year',
            strokeColor: 'f1c40f',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            fill: false,
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      }
    });
  }

}
