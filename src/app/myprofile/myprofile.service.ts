import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Http, Response, ResponseType} from '@angular/http';
import {Observable} from 'rxjs';
import {Patient} from '../signup-in/patient.model';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class MyProfileService {

  constructor(private httpClient: HttpClient) {
  }

  private profileUrl = 'http://localhost:8080/myprofile';

  public setPatDetails(pat: Patient) {
    return this.httpClient.post(this.profileUrl, JSON.stringify(pat), httpOptions);
  }

  public getPatDetails(email: String): Observable<Patient> {
    const params = new HttpParams()
      .set('email', email.toString());
    return this.httpClient.get<Patient>(this.profileUrl, {params: params});
  }

}
