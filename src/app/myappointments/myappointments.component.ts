import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MyAppointmentsService} from './myappointments.service';
import {formatDate} from '@angular/common';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {HttpClient} from '@angular/common/http';
import {Doctor} from '../model/doctor';
import {ModalComponent} from '../modal/modal.component';
import {ApiService} from '../services/api.service';
import {Router} from '@angular/router';
import {Comment} from '../model/comment';
import {Rating} from '../model/rating-review';

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.component.html',
  styleUrls: ['./myappointments.component.scss'],
  providers: [MyAppointmentsService]
})

export class MyappointmentsComponent implements OnInit {

  private previousAppointments: Array<object> = [];
  private upcomingAppointments: Array<object> = [];
  appointments: Object[];
  colorGreen: string;
  rowNumber: number;
  @ViewChild('mainSection', {read: ElementRef}) mainSection: ElementRef;
  finishedDataRetrieval: boolean;

  constructor(private myappointmentService: MyAppointmentsService, private dialog: MatDialog, private apiService: ApiService) {

  }

  ngOnInit() {
    this.finishedDataRetrieval = false;
    const userData = (localStorage.getItem('userDetail'));
    const userObject = JSON.parse(userData);
    console.log('User data: ' + JSON.parse(userData));
    console.log('ID: ' + userObject.userID);
    console.log('Email: ' + userObject.email);
    this.getAppointments(userObject.userID);
    this.colorGreen = '#8dc00c';
  }

  public getAppointments(patient_id: Number) {
    this.myappointmentService.getAppointments(patient_id).subscribe((data: Array<object>) => {
        this.finishedDataRetrieval = true;
        console.log(this.finishedDataRetrieval + 'loader');
        this.appointments = data;
        console.log('Appointments', this.appointments);
        this.setSectionHeight();

        for (const appointment of data) {
          if ((<any>appointment).appt_date < formatDate(new Date(), 'yyyy-MM-dd', 'en')) {
            this.previousAppointments.push(appointment);
            console.log('Previous appointments');
          } else {
            this.upcomingAppointments.push(appointment);
            console.log('Upcoming appointments');
          }
        }
      },
      err => {
        console.log(err);
        this.openDialog('Error', 'There was an error. Please, try again later.');
      });
  }

  public deleteAppointment(appt_id: Number, rowNo: number) {
    this.deleteApptConfirmationDialog(appt_id, 'Confirmation', 'Do you really want to cancel the appointment?',
      true, 'Yes', '/myappointments');
    this.rowNumber = rowNo;
    console.log('deleted' + this.rowNumber + 'appt' + appt_id);
  }

  setSectionHeight() {
    console.log('this.appointments.length', this.appointments.length);
    if (this.appointments.length >= 2) {
      $(this.mainSection.nativeElement).removeClass('my-appointments-full-page-section');
      $(this.mainSection.nativeElement).addClass('my_appointments_overflow');
    } else {
      $(this.mainSection.nativeElement).addClass('my-appointments-full-page-section');
      $(this.mainSection.nativeElement).removeClass('my_appointments_overflow');
    }
  }

  deleteApptConfirmationDialog(appt_id: Number, title: string, description: string, extra_button?: boolean,
                               extra_button_text?: string, extra_button_url?: string) {
    const dialogConfig = new MatDialogConfig();
    let confirmation = false;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: title,
      description: description,
      extra_button: extra_button,
      extra_button_text: extra_button_text,
      extra_button_url: extra_button_url
    };

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log('Dialog output:', data);
        confirmation = data;
        if (confirmation) {
          this.myappointmentService.deleteAppointment(appt_id).subscribe(x => {
            console.log('service call success');
            this.appointments = this.appointments.slice(this.rowNumber, 1);
            // .concat(this.appointments.slice(this.rowNumber + 1, this.appointments.length));
            console.log(this.appointments);
            console.log('service call over');
            event.stopPropagation();
          });
          window.location.reload();
        } else {
          this.openDialog('Confirmation', 'Appointment not cancelled.');
        }
      },
      err => {
        console.log(err);
        this.openDialog('Error', 'There was an error. Please, try again later.');
      }
    );
  }

  openDialog(title: string, description: string, extra_button?: boolean, extra_button_text?: string, extra_button_url?: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: title,
      description: description,
      extra_button: extra_button,
      extra_button_text: extra_button_text,
      extra_button_url: extra_button_url
    };

    this.dialog.open(DialogComponent, dialogConfig);

  }

  openRatingDialog(id: string, firstname: string, lastname: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    dialogConfig.data = {
      id: 1,
      doctor_id: id,
      firstname: firstname,
      lastname: lastname
    };

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    const userData = (localStorage.getItem('userDetail'));
    const userObject = JSON.parse(userData);

    dialogRef.afterClosed().subscribe(result => {
        console.log('result', result);
        if (result !== undefined) {
          const rating = new Rating(Number(result.rating), result.message, userObject.userID, Number(id), new Date());
          this.apiService.setRating(rating).subscribe(data => {
            console.log(data);
          });
        }
      },
      error => {
        console.log(error);
        this.openDialog('Error', 'There was an error. Please, try again later.');
      });


  }
}
