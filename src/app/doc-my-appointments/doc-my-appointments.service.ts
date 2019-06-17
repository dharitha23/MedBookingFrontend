import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DocAppointmentModel} from './docappointment.model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {UserService} from '../signup-in/user.service';
import set = Reflect.set;
import {ConfirmAppointment} from '../model/confirmappointment.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class DocMyAppointmentsService {
  API_URL = 'http://localhost:8080';
  private confirmAppointmentURL = 'http://localhost:8080/DoctorConfirmation';

  constructor(private http: HttpClient) {
  }

  getAppointments(doctor_id: Number): Observable<ConfirmAppointment[]> {
    const params = new HttpParams()
      .set('doctor_id', doctor_id.toString());
    return this.http.get<ConfirmAppointment[]>('http://localhost:8080/docmyappointments', {params: params});
  }

  DoctorConfirmation(appt_Id: Number): Observable<Boolean> {
    return this.http.post<Boolean>(this.confirmAppointmentURL, String(appt_Id), httpOptions);
  }
}
