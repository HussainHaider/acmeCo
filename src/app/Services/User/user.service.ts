import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import {AngularFireAuth} from 'angularfire2/auth';



@Injectable()
export class UserService {
  error: any;
  authState: any = null;

  constructor(private http: Http, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  signup(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.error = undefined;
      })
      .catch((error) => {
        this.error = error;
      });
  }


  signin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.error = undefined;
      })
      .catch((error) => {
        this.error = error;
      });
  }

  logout() {
    localStorage.clear();
    this.authState = null;
  }

  isLoggedIn() {
    return localStorage.getItem('userId') !== null;
  }
}
