import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

/** Source: https://material.angular.io/components/dialog/overview **/
/** https://blog.angular-university.io/angular-material-dialog/ **/
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  title: string;
  description: string;
  extra_button: boolean;
  extra_button_text: string;
  extra_button_url: string;

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.title = data.title;
    this.description = data.description;
    this.extra_button = data.extra_button;
    this.extra_button_text = data.extra_button_text;
    this.extra_button_url = data.extra_button_url;
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



