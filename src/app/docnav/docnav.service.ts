import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocNotif } from '../model/doctornotif.model';
import { FormControl } from '@angular/forms';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable()
export class DocnavService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080/getdocnotif';
    GetDoctorNotif(doctor_id: Number): Observable<DocNotif[]> {
    const params = new HttpParams()
      .set('doctor_id', doctor_id.toString());

    return this.http.get<DocNotif[]>(this.url, {params : params});
  }


}
