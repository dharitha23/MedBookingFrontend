import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfirmAppointment} from '../model/confirmappointment.model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {UserService} from '../signup-in/user.service';
import set = Reflect.set;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class MyAppointmentsService {

  API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getAppointments(patient_id: Number): Observable<ConfirmAppointment[]> {
    const params = new HttpParams()
      .set('patient_id', patient_id.toString());
    return this.http.get<ConfirmAppointment[]>('http://localhost:8080/myappointments', {params: params});
  }

  deleteAppointment(appt_id: Number) {
    const params = new HttpParams()
      .set('appt_id', String(appt_id));
    return this.http.delete('http://localhost:8080/myappointments/delete', {params: params});
  }
}
