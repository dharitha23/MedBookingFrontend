import {Patient} from './patient.model';
import {Doctor} from './doctor.model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Http, Response, ResponseType} from '@angular/http';
//import { Headers, RequestOptions } from '@angular/http';
import {User} from './user.model';
import {Observable} from 'rxjs';
import {NewUser} from './newuser.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  private signupinUrl = 'http://localhost:8080/signupin';
  private sessionUrl = 'http://localhost:8080/signupin/user';
  private bookaptUrl = 'http://localhost:8080/bookappointment';
  private fetchPatient = 'http://localhost:8080/fetchPatient';

  //private signupUrl = '/api';

  public getUsers(userName: String): Observable<User[]> {
    let params = new HttpParams()
      .set('userName', userName.toString());
    return this.httpClient.get<User[]>(this.signupinUrl, {params: params});
  }

  public addUser(user: NewUser): Observable<NewUser> {
    return this.httpClient.post<NewUser>(this.signupinUrl, JSON.stringify(user), httpOptions);
  }

  public createDoctorSession(user: User): Observable<User> {
    return this.httpClient.post<User>(this.bookaptUrl, JSON.stringify(user), httpOptions);
  }

  public createPatientSession(user: User): Observable<User> {
    return this.httpClient.post<User>(this.bookaptUrl, JSON.stringify(user), httpOptions);
  }

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.signupinUrl);
  }


  public getUser(email: String): Observable<Patient> {
    let params = new HttpParams()
      .set('email', email.toString());
    console.log('in getuser');
    return this.httpClient.get<Patient>(this.fetchPatient, {params: params});
  }

}
