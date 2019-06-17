import {Component, OnInit, Inject, EventEmitter} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogData} from '../DialogData';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  firstname: string;
  lastname: string;
  doctor_id: string;
  message: string;
  currentRate = 0;


  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.doctor_id = data.doctor_id;
    this.message = '';

  }


  // onOk = new EventEmitter();

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick() {
    const message = this.message;
    const data = {
      message: this.message,
      rating: this.currentRate
    };
    console.log('message is : ' + message);
    localStorage.setItem('message', message);
    this.dialogRef.close(data);

  }


}
