import {Component, OnInit} from '@angular/core';
import {DataService} from '../../Services/Data/data.service';
import {Router} from '@angular/router';
import {FlightService} from '../../Services/Flight/flight.service';
import {Flight} from '../../Models/flight.model';
import {UserService} from '../../Services/User/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  flagCheck = true;

  constructor(private flightService: FlightService, private dataService: DataService, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
  }

  switchHistory() {
    console.log('IN_switchHistory');
    const data = this.flightService.GetFlightsHistory();
    // .subscribe(
    //   data => {
    //     console.log('Data:' + JSON.stringify(data));
    //     this.dataService.data_things = JSON.stringify(data);
    //     this.router.navigateByUrl('/SearchResults');
    //   },
    //   error => console.error(error)
    // );
    this.dataService.data_things = JSON.stringify(data);
    this.router.navigateByUrl('/main/history');
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/flightHome');
  }

  goToDashboard() {
    const city = 'New York';
    this.router.navigate(['/main/dashboard', city]);
  }

  callDashboard(event) {
    console.log('event ' + event.target.value);
    this.router.navigate(['/main/dashboard', event.target.value]);
  }
}
