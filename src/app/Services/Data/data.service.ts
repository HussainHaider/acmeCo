import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DataService {
  private _data_things: any;
  myMethod$: Observable<any>;
  private myMethodSubject = new Subject<any>();
  constructor() {
    this.myMethod$ = this.myMethodSubject.asObservable();
  }

  set data_things(value: any) {
    this._data_things = value;
  }

  get data_things(): any {
    return JSON.parse(this._data_things);
  }

  myMethod(data) {
    this.myMethodSubject.next(data);
  }
}
