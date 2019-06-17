import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Http, Response, ResponseType} from '@angular/http';
import {Observable} from 'rxjs';
import {Doctor} from '../signup-in/doctor.model';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class DocProfileService {

  constructor(private httpClient: HttpClient) {
  }

  private docprofileUrl = 'http://localhost:8080/docprofile';

  public setDetails(doc: Doctor) {
    return this.httpClient.post<Doctor>(this.docprofileUrl, JSON.stringify(doc), httpOptions);
  }

  public getDocDetails(email: String): Observable<Doctor> {
    let params = new HttpParams()
      .set('email', email.toString());
    return this.httpClient.get<Doctor>(this.docprofileUrl, {params: params});
  }

}
