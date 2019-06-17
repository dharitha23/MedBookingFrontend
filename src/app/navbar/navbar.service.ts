import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientNotif } from '../model/patientnotif.model';
import { FormControl } from '@angular/forms';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable()
export class NavbarService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080/getpatientnotif';
  GetPatientNotif(patient_id: Number): Observable<PatientNotif[]> {
    const params = new HttpParams()
      .set('patient_id', patient_id.toString());

    return this.http.get<PatientNotif[]>(this.url, {params : params});
  }


}
