import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class LoginService {

  constructor(private http: Http) {}

  login(data: any): Observable<any[]> {
    return this.http.post('http://localhost:3000/users', data)
      .map(res => <any[]>res.json());
  }
}

