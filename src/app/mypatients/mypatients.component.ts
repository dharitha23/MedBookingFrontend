import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';


@Component({
  selector: 'app-mypatients',
  templateUrl: './mypatients.component.html',
  styleUrls: ['./mypatients.component.scss']
})
export class MypatientsComponent implements OnInit {
  @ViewChild('mainSection', {read: ElementRef}) mainSection: ElementRef;
  finishedDataRetrieval: boolean;
  patients: Object[];
  dataSource;

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'contactNumber'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private router: Router, private apiService: ApiService, private dialog: MatDialog) {
  }


  ngOnInit() {
    const userData = (localStorage.getItem('userDetail'));
    const userObject = JSON.parse(userData);

    this.apiService.getDoctorsPatients(userObject.userID)
      .subscribe(data => {
        this.patients = data;
        this.dataSource = new MatTableDataSource(data);

        this.finishedDataRetrieval = true;
        this.setSectionHeight();
        console.log(data);
      },
        err => {
          console.log(err);
          this.openDialog('Error', 'There was an error. Please, try again later.');
        });
  }

  setSectionHeight() {
    if (this.patients.length >= 5) {
      $(this.mainSection.nativeElement).removeClass('my-appointments-full-page-section');
      $(this.mainSection.nativeElement).addClass('my_appointments_overflow');
    } else {
      $(this.mainSection.nativeElement).addClass('my-appointments-full-page-section');
      $(this.mainSection.nativeElement).removeClass('my_appointments_overflow');
    }
  }

  showPatientDetail(patient: Object) {
    console.log('patient', patient);
    window.localStorage.removeItem('showPatientDetail');
    window.localStorage.setItem('showPatientDetail', JSON.stringify(patient));
    this.router.navigate(['patient']);
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
}
