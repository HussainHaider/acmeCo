import {Injectable} from '@angular/core';
import {UserService} from '../User/user.service';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate() {

    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/main/dashboard');
      return false;
    } else {
      return true;
    }
  }

}
