import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Doctor} from './../model/doctor';
import {SearchParams} from '../model/search-params';
import {Comment} from '../model/comment';
import {Observable} from 'rxjs';
import {Patient} from '../signup-in/patient.model';
import {Rating} from '../model/rating-review';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'http://localhost:8080/';
  public firstPage = '';
  public prevPage = '';
  public nextPage = '';
  public lastPage = '';


  constructor(private httpClient: HttpClient) {
  }

  public createDoctor(doctor: Doctor) {
  }

  public updateDoctor(doctor: Doctor) {
  }

  public deleteDoctor(id: number) {
  }

  public getDoctorById(id: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    let params = new HttpParams();
    params = params.append('id', id);

    return this.httpClient.get<Doctor>(`${this.apiURL}/doctor`, {headers: headers, params: params});
  }

  public searchDoctors(searchParams: SearchParams) {
    // https://stackoverflow.com/questions/47551458/how-to-pass-urlsearchparams-in-the-httpclient-get-method-angular-5?rq=1
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    let params = new HttpParams();
    params = params.append('latitude', searchParams.latitude);
    params = params.append('longitude', searchParams.longitude);
    params = params.append('speciality', searchParams.speciality);
    params = params.append('searchText', searchParams.searchText);

    return this.httpClient.get<Doctor[]>(`${this.apiURL}/search`, {headers: headers, params: params});
  }

  public getDoctorsPatients(id: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    let params = new HttpParams();
    params = params.append('id', id);

    return this.httpClient.get<Object[]>(`${this.apiURL}/mypatients`, {headers: headers, params: params});
  }

  public getPatientsComments(id: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    let params = new HttpParams();
    params = params.append('id', id);

    return this.httpClient.get<Comment[]>(`${this.apiURL}/patientcomments`, {headers: headers, params: params});
  }


  public saveAppointmentNotes(comment: Comment): Observable<Comment> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpClient.post<Comment>(`${this.apiURL}/saveapptnotes`, JSON.stringify(comment), {headers: headers});
  }


  public getPatientDetails(email: String): Observable<Patient> {
    const params = new HttpParams()
      .set('email', email.toString());
    return this.httpClient.get<Patient>(`${this.apiURL}/myprofile`, {params: params});
  }

  public setRating(rating: Rating): Observable<Rating> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<Rating>(`${this.apiURL}/rating`, JSON.stringify(rating), {headers: headers});
  }

}
