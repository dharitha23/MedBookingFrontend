import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfirmAppointment} from '../model/confirmappointment.model';
import {FormControl} from '@angular/forms';
import {Patient} from '../signup-in/patient.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ConfirmAppointmentService {
  constructor(private http: HttpClient) {
  }
  private profileUrl = 'http://localhost:8080/myprofile';

  InsertBookingDetail(bookingmodel: ConfirmAppointment): Observable<Boolean> {
    return this.http.post<Boolean>('http://localhost:8080/confirmappointment', bookingmodel, httpOptions);
  }

  GetDoctorAvailability(doctor_id: Number, appointmentDate: Date): Observable<ConfirmAppointment []> {
    const params = new HttpParams()
      .set('doctor_id', doctor_id.toString())
      .set('appointmentDate', appointmentDate.toString());

    return this.http.get<ConfirmAppointment[]>('http://localhost:8080/getavailability', {params: params});
  }

  public getPatientDetails(email: String): Observable<Patient> {
    const params = new HttpParams()
      .set('email', email.toString());
    return this.http.get<Patient>(this.profileUrl, {params: params});
  }



}
