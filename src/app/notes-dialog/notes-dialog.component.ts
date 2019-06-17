import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

/** Source: https://material.angular.io/components/dialog/overview **/
/** https://blog.angular-university.io/angular-material-dialog/ **/
@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.scss']
})
export class NotesDialogComponent implements OnInit {
  patientName: string;
  appointmentDate: string;
  apptId: string;
  description: string;

  constructor(
    private dialogRef: MatDialogRef<NotesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.apptId = data.apptId;
    this.patientName = data.patientName;
    this.appointmentDate = data.appointmentDate;
    this.description = '';
  }

  ngOnInit() {
  }

  save() {
    const confirm = true;
    this.dialogRef.close(confirm);
  }

  close() {
    const confirm = false;
    this.dialogRef.close(confirm);
  }

}




