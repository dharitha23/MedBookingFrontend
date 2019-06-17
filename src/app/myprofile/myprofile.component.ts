/// <reference types="@types/googlemaps" />
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyProfileService} from './myprofile.service';
import {Patient} from '../signup-in/patient.model';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss'],
  providers: [MyProfileService]
})
export class MyprofileComponent implements OnInit {
  disableButtons: boolean;

  constructor(private myprofileservice: MyProfileService, private dialog: MatDialog) {
  }


  updateForm = new FormGroup({
    firstName: new FormControl({value: '', disabled: 'true'}, Validators.required),
    lastName: new FormControl({value: '', disabled: 'true'}, Validators.required),
    email: new FormControl({value: '', disabled: 'true'}, [Validators.required, Validators.email]),
    mobile: new FormControl({value: '', disabled: 'true'}, Validators.required),
    password: new FormControl({value: '', disabled: 'true'}, Validators.required),
    confirmPassword: new FormControl({value: '', disabled: 'true'}, Validators.required),
    birthday: new FormControl({value: '', disabled: 'true'}, Validators.required)
  });

  userEmail: String;
  userPwd: String;
  pat: Patient = {
    'birthday': null,
    'contactNumber': 'null',
    'firstName': 'null',
    'lastName': 'null',
    'email': 'null',
    'password': 'null',
    'type': 'null'
  };
  pat1: Patient = {
    'birthday': null,
    'contactNumber': 'null',
    'firstName': 'null',
    'lastName': 'null',
    'email': 'null',
    'password': 'null',
    'type': 'null'
  };
  completeAddressString: String;

  ngOnInit() {
    const fromSignUp = window.localStorage.getItem('fromSignUp');
    console.log('fromSignUp', fromSignUp);
    if (fromSignUp === 'true') {
      localStorage.removeItem('fromSignUp');
      this.openDialog('Success', 'Thanks for joining Medbooking!' +
        ' \n Please, complete your profile details.');
    }

    this.disableButtons = true;
    const user = JSON.parse(localStorage.getItem('userDetail'));
    this.userEmail = user.email;
    this.userPwd = user.password;
    this.myprofileservice.getPatDetails(this.userEmail).subscribe(data => {
      user.userID = (JSON.parse(JSON.stringify(data))).patientID;
      localStorage.setItem('userDetail', JSON.stringify(user));

      this.pat = data;
      this.updateForm.get('firstName').setValue(this.pat.firstName);
      this.updateForm.get('lastName').setValue(this.pat.lastName);
      this.updateForm.get('email').setValue(this.pat.email);
      //this.updateForm.get('password').setValue(this.pat.password);
      //this.updateForm.get('confirmPassword').setValue(this.pat.password);
      this.updateForm.get('mobile').setValue(this.pat.contactNumber);
      this.updateForm.get('birthday').setValue(this.pat.birthday);
    });
  }

  enable() {
    this.disableButtons = false;
    this.updateForm.get('firstName').enable();
    this.updateForm.get('lastName').enable();
    this.updateForm.get('email').enable();
    this.updateForm.get('password').enable();
    this.updateForm.get('confirmPassword').enable();
    this.updateForm.get('mobile').enable();
    this.updateForm.get('birthday').enable();
  }

  submit() {
    this.disableButtons = true;
    this.pat1.firstName = this.updateForm.get('firstName').value;
    this.pat1.lastName = this.updateForm.get('lastName').value;
    this.pat1.email = this.updateForm.get('email').value;
    this.pat1.birthday = this.updateForm.get('birthday').value;
    this.pat1.contactNumber = this.updateForm.get('mobile').value;
    this.pat1.password = this.updateForm.get('password').value;
    this.pat1.type = 'patient';
    this.updateForm.get('firstName').setValue(this.pat1.firstName);
    this.updateForm.get('lastName').setValue(this.pat1.lastName);
    this.updateForm.get('email').setValue(this.pat1.email);
    this.updateForm.get('password').setValue('');
    this.updateForm.get('confirmPassword').setValue('');
    this.updateForm.get('mobile').setValue(this.pat1.contactNumber);
    this.updateForm.get('birthday').setValue(this.pat1.birthday);
    this.updateForm.get('firstName').disable();
    this.updateForm.get('lastName').disable();
    this.updateForm.get('email').disable();
    this.updateForm.get('password').disable();
    this.updateForm.get('confirmPassword').disable();
    this.updateForm.get('mobile').disable();
    this.updateForm.get('birthday').disable();
    this.setPatDetails(this.pat1);
  }

  setPatDetails(pat: Patient) {
    this.myprofileservice.setPatDetails(pat).subscribe(data => {
      localStorage.removeItem('userFirstName');
      localStorage.setItem('userFirstName', this.pat1.firstName.toString());
      localStorage.removeItem('userLastName');
      localStorage.setItem('userLastName', this.pat1.lastName.toString());
      localStorage.removeItem('userPhoneNumber');
      localStorage.setItem('userPhoneNumber', this.pat1.contactNumber.toString());
    });
  }

  cancel() {
    this.disableButtons = true;

    this.myprofileservice.getPatDetails(this.userEmail).subscribe(data => {
      this.pat = data;
      console.log(this.pat);
      this.updateForm.get('firstName').setValue(this.pat.firstName);
      this.updateForm.get('lastName').setValue(this.pat.lastName);
      this.updateForm.get('email').setValue(this.pat.email);
      this.updateForm.get('password').setValue('');
      this.updateForm.get('confirmPassword').setValue('');
      this.updateForm.get('mobile').setValue(this.pat.contactNumber);
      this.updateForm.get('birthday').setValue(this.pat.birthday);
    });
    this.updateForm.get('firstName').disable();
    this.updateForm.get('lastName').disable();
    this.updateForm.get('email').disable();
    this.updateForm.get('password').disable();
    this.updateForm.get('confirmPassword').disable();
    this.updateForm.get('mobile').disable();
    this.updateForm.get('birthday').disable();

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
