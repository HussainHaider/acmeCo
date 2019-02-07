import {Component, OnInit} from '@angular/core';
import {User} from '../../Models/user.model';
import {UserService} from '../../Services/User/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  comp = 'signup';
  errorMsg = false;
  weakPasswordMsg = false;
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  submit(f) {
    console.log('SignUp' + JSON.stringify(f.value));
    const user = new User(
      f.value.email, f.value.password, f.value.username);
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
