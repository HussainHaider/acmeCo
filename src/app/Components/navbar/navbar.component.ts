import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../Services/User/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() Component: string;
  currency = ['USD', 'AUD', 'EUR'];
  OptionSelected = this.currency[1];

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  onOptionsSelected(event) {
    console.log(event);
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  onLogout() {
    this.userService.logout();
    this.router.navigateByUrl('/home');
  }
}
