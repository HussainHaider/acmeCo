import {Component, OnInit} from '@angular/core';
import {User} from '../../Models/user.model';
import {Router} from '@angular/router';
import {UserService} from '../../Services/User/user.service';


@Component({
  selector: 'app-acme-login',
  templateUrl: './acme-login.component.html',
  styleUrls: ['./acme-login.component.css']
})
export class AcmeLoginComponent implements OnInit {
  errorMsg = false;
  wrongPasswordMsg = false;
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  submit(f) {
    console.log('acmeLogin' + JSON.stringify(f.value));
    const user = new User(
      f.value.email, f.value.password);
    this.userService.signin(f.value.email, f.value.password).then((data) => {
      if (this.userService.error === undefined) {
        localStorage.setItem('userId', this.userService.authState['uid']);
        this.router.navigateByUrl('/main');
      } else if (this.userService.error['code'] === 'auth/user-not-found') {
        this.errorMsg = true;
      } else if (this.userService.error['code'] === 'auth/wrong-password') {
        this.wrongPasswordMsg = true;
        this.errorMsg = false;
      }
    });
  }
}
