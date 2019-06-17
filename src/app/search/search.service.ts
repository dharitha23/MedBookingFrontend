import {Patient} from './patient';
import {NewUser} from './../signup-in/newuser.model';
import {Doctor} from './../signup-in/doctor.model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Http, Response, ResponseType} from '@angular/http';
//import { Headers, RequestOptions } from '@angular/http';
import {User} from './../signup-in/user.model';
import {Observable} from 'rxjs';
import {Rating} from '../model/rating-review';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class SearchService {

  constructor(private httpClient: HttpClient) {
  }

  private fetchPatient = 'http://localhost:8080/fetchPatient';

  public getUser(email: String): Observable<Patient> {
    let params = new HttpParams()
      .set('email', email.toString());
    console.log('in getuser');
    return this.httpClient.get<Patient>(this.fetchPatient, {params: params});
  }


}
