import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DocMyAppointmentsService} from './doc-my-appointments.service';
import {formatDate} from '@angular/common';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {NotesDialogComponent} from '../notes-dialog/notes-dialog.component';
import {ApiService} from '../services/api.service';
import {DialogComponent} from '../dialog/dialog.component';
import {Comment} from '../model/comment';
import {Router} from '@angular/router';
import {MyAppointmentsService} from '../myappointments/myappointments.service';
import {DocAppointmentModel} from './docappointment.model';

@Component({
  selector: 'app-doc-my-appointments',
  templateUrl: './doc-my-appointments.component.html',
  styleUrls: ['./doc-my-appointments.component.scss'],
  providers: [DocMyAppointmentsService, MyAppointmentsService]
})
export class DocMyAppointmentsComponent implements OnInit {
  private previousDocAppointments: Array<object> = [];
  private upcomingDocAppointments: Array<object> = [];
  appointments: Object[];
  colorGreen: string;
  rowNumber: number;
  @ViewChild('mainSection', {read: ElementRef}) mainSection: ElementRef;
  finishedDataRetrieval: boolean;

  constructor(private docmyappointmentService: DocMyAppointmentsService, private apiService: ApiService, private dialog: MatDialog,
              private router: Router, private myappointmentService: MyAppointmentsService) {

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

  public getAppointments(doctor_id: Number) {
    this.docmyappointmentService.getAppointments(doctor_id).subscribe((data: Array<object>) => {
        this.finishedDataRetrieval = true;

        this.appointments = data;
        console.log('Appointments: ', data);
        this.setSectionHeight();
        for (const appointment of data) {
          if ((<any>appointment).apptDate < formatDate(new Date(), 'yyyy-MM-dd', 'en')) {
            this.previousDocAppointments.push(appointment);
            console.log('Previous appointments');
          } else {
            this.upcomingDocAppointments.push(appointment);
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
    this.deleteApptConfirmationDialog(appt_id, 'Confirmation', 'Do you really want to cancel the appointment?', true,
      'Yes', '/docmyappointments');
    this.rowNumber = rowNo;
    console.log('deleted' + this.rowNumber);
  }

  public confirmappointment(apptId: number, updatedRow: number) {
    this.docmyappointmentService.DoctorConfirmation(apptId).subscribe(data => {
        (<any>this.upcomingDocAppointments[updatedRow]).appt_status = 'Confirmed';
      },
      err => {
        console.log(err);
        this.openDialog('Error', 'There was an error. Please, try again later.');
      }
    );
  }

  deleteApptConfirmationDialog(appt_id: Number, title: string, description: string, extra_button?: boolean, extra_button_text?: string,
                               extra_button_url?: string) {
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

  setSectionHeight() {
    if (this.appointments.length >= 2) {
      $(this.mainSection.nativeElement).removeClass('my-appointments-full-page-section');
      $(this.mainSection.nativeElement).addClass('my_appointments_overflow');
    } else {
      $(this.mainSection.nativeElement).addClass('my-appointments-full-page-section');
      $(this.mainSection.nativeElement).removeClass('my_appointments_overflow');
    }
  }

  addNotes(id: string, patientName: string, appointmentDate: string) {
    this.openNotesDialog(id, patientName, appointmentDate);

  }

  openNotesDialog(apptId: string, patientName: string, appointmentDate: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      apptId: apptId,
      patientName: patientName,
      appointmentDate: appointmentDate
    };

    const dialogRef = this.dialog.open(NotesDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(comm_message => {
      console.log('The dialog was closed', comm_message);
      if (comm_message) {
        const comment = new Comment(Number(apptId), comm_message);

        this.apiService.saveAppointmentNotes(comment).subscribe((data) => {
            console.log(data);
          },
          (err) => {
            console.log(err);
            this.openDialog('Error', 'There was an error. Please, try again later.');
          });
      }
    });
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

  viewHistory(patientEmail: string) {
    this.apiService.getPatientDetails(patientEmail).subscribe((data) => {
        localStorage.removeItem('showPatientDetail');
        localStorage.setItem('showPatientDetail', JSON.stringify(data));
        this.router.navigate(['patient']);
        console.log(data);
      },
      (err) => {
        console.log(err);
        this.openDialog('Error', 'There was an error. Please, try again later.');
      });

  }
}

