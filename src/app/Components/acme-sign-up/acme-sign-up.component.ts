import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../Services/User/user.service';
import {User} from '../../Models/user.model';

@Component({
  selector: 'app-acme-sign-up',
  templateUrl: './acme-sign-up.component.html',
  styleUrls: ['./acme-sign-up.component.css']
})
export class AcmeSignUpComponent implements OnInit {
  errorMsg = false;
  weakPasswordMsg = false;
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  submit(f) {
    console.log('acmeSignUp' + JSON.stringify(f.value));
    const user = new User(
      f.value.email, f.value.password, f.value.username, f.value.CompanyName);
    this.userService.signup(f.value.email, f.value.password).then((data) => {
      if (this.userService.error === undefined) {
        localStorage.setItem('userId', this.userService.authState['uid']);
        this.router.navigateByUrl('/main');
      } else if (this.userService.error['code'] === 'auth/email-already-in-use') {
        this.errorMsg = true;
      } else if (this.userService.error['code'] === 'auth/weak-password') {
        this.weakPasswordMsg = true;
        this.errorMsg = false;
      }
    });
  }
}
