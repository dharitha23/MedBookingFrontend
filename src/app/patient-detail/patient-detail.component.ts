import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {Comment} from '../model/comment';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {
  patient: Object;
  comments: Comment[];
  dataSource;

  @ViewChild('mainSection', {read: ElementRef}) mainSection: ElementRef;
  finishedDataRetrieval: boolean;
  displayedColumns: string[] = ['appt_date', 'comm_message'];

  constructor(private router: Router, private apiService: ApiService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.finishedDataRetrieval = false;
    const patientData = (localStorage.getItem('showPatientDetail'));
    this.patient = JSON.parse(patientData);
    console.log(this.patient);
    const patientId = JSON.parse(patientData).patientID;
    if (!patientId) {
      this.openDialog('Error', 'There was an error. Please, try again later.');
      this.router.navigate(['mypatients']);
      return;
    }

    this.apiService.getPatientsComments(patientId)
      .subscribe(data => {
          this.finishedDataRetrieval = true;
          this.comments = data;
          this.dataSource = new MatTableDataSource(data);

          this.setSectionHeight();
          console.log(data);
        },
        err => {
          console.log(err);
          this.openDialog('Error', 'There was an error. Please, try again later.');
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

  setSectionHeight() {
    if (this.comments.length >= 3) {
      $(this.mainSection.nativeElement).removeClass('my-appointments-full-page-section');
      $(this.mainSection.nativeElement).addClass('my_appointments_overflow');
    } else {
      $(this.mainSection.nativeElement).addClass('my-appointments-full-page-section');
      $(this.mainSection.nativeElement).removeClass('my_appointments_overflow');
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
