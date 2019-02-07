import {Component, OnInit} from '@angular/core';
import {User} from '../../Models/user.model';
import {UserService} from '../../Services/User/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  comp = 'login';
  errorMsg = false;
  wrongPasswordMsg = false;
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  submit(f) {
    console.log('Login' + JSON.stringify(f.value));
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

  onLogout() {
    this.userService.logout();
  }
}
