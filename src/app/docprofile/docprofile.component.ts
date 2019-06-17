/// <reference types="@types/googlemaps" />
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DocProfileService} from './docprofile.service';
import {Doctor} from './../signup-in/doctor.model';
import {SignupInComponent} from './../signup-in/signup-in.component';
import {AfterViewInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {MyProfileService} from '../myprofile/myprofile.service';

@Component({
  selector: 'app-docprofile',
  templateUrl: './docprofile.component.html',
  styleUrls: ['./docprofile.component.scss'],
  providers: [DocProfileService]
})
export class DocProfileComponent implements OnInit {
  disableButtons: boolean;

  //@ViewChild(SignupInComponent) user: SignupInComponent;

  constructor(private docprofileservice: DocProfileService, private dialog: MatDialog) {
  }

  updateForm = new FormGroup({
    firstName: new FormControl({value: '', disabled: 'true'}, Validators.required),
    lastName: new FormControl({value: '', disabled: 'true'}, Validators.required),
    email: new FormControl({value: '', disabled: 'true'}, [Validators.required, Validators.email]),
    password: new FormControl({value: '', disabled: 'true'}, Validators.required),
    confirmPassword: new FormControl({value: '', disabled: 'true'}, Validators.required),
    speciality: new FormControl({value: '', disabled: 'true'}, Validators.required),
    mobile: new FormControl({value: '', disabled: 'true'}, Validators.required),
    address: new FormControl({value: '', disabled: 'true'}, Validators.required)
  });

  doc1: Doctor = {
    'address': 'null',
    'contactNumber': 'null',
    'firstName': 'null',
    'lastName': 'null',
    'email': 'null',
    'password': 'null',
    'speciality': 'null',
    'type': 'null',
    'latitude': 'null',
    'longitude': 'null'
  };
  doc2: Doctor = {
    'address': 'null',
    'contactNumber': 'null',
    'firstName': 'null',
    'lastName': 'null',
    'email': 'null',
    'password': 'null',
    'speciality': 'null',
    'type': 'null',
    'latitude': 'null',
    'longitude': 'null'
  };
  completeAddressString: String;
  userLatitude: String;
  userLongitude: String;
  userEmail: String;
  userPwd: String;

  ngOnInit() {
    this.disableButtons = true;
    const fromSignUp = window.localStorage.getItem('fromSignUp');
    console.log('fromSignUp', fromSignUp);
    if (fromSignUp === 'true') {
      localStorage.removeItem('fromSignUp');
      this.openDialog('Success', 'Thanks for joining Medbooking!' +
        ' \n Please, complete your profile details.');
    }

    //this.userEmail = this.user.confirmedUserEmail;
    //this.userPwd = this.user.confirmedUserPassword;
    let user = JSON.parse(localStorage.getItem('userDetail'));
    console.log(user);
    this.userEmail = user.email;
    console.log('Email ' + this.userEmail);
    // console.log("Password "+this.userPwd);
    this.implementGoogleMapsAutocomplete();
    this.docprofileservice.getDocDetails(this.userEmail).subscribe(data => {
      console.log('Data', data);
      user.userID = (JSON.parse(JSON.stringify(data))).docID;
      localStorage.setItem('userDetail', JSON.stringify(user));
      this.doc1 = data;
      console.log(this.doc1);
      this.updateForm.get('firstName').setValue(this.doc1.firstName);
      this.updateForm.get('lastName').setValue(this.doc1.lastName);
      this.updateForm.get('email').setValue(this.doc1.email);
      //this.updateForm.get('password').setValue(this.doc1.password);
      //this.updateForm.get('confirmPassword').setValue(this.doc1.password);
      this.updateForm.get('mobile').setValue(this.doc1.contactNumber);
      this.updateForm.get('address').setValue(this.doc1.address);
      this.updateForm.get('speciality').setValue(this.doc1.speciality);
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
    this.updateForm.get('address').enable();
    this.updateForm.get('speciality').enable();
  }

  submit() {
    this.disableButtons = true;

    this.doc2.firstName = this.updateForm.get('firstName').value;
    this.doc2.lastName = this.updateForm.get('lastName').value;
    this.doc2.email = this.updateForm.get('email').value;
    this.doc2.address = this.updateForm.get('address').value;
    this.doc2.contactNumber = this.updateForm.get('mobile').value;
    this.doc2.password = this.updateForm.get('password').value;
    this.doc2.speciality = this.updateForm.get('speciality').value;
    this.doc2.type = 'doctor';
    this.doc2.latitude = this.userLatitude;
    this.doc2.longitude = this.userLongitude;
    this.updateForm.get('firstName').setValue(this.doc2.firstName);
    this.updateForm.get('lastName').setValue(this.doc2.lastName);
    this.updateForm.get('email').setValue(this.doc2.email);
    this.updateForm.get('password').setValue('');
    this.updateForm.get('confirmPassword').setValue('');
    this.updateForm.get('mobile').setValue(this.doc2.contactNumber);
    this.updateForm.get('address').setValue(this.doc2.address);
    this.updateForm.get('speciality').setValue(this.doc2.speciality);
    this.updateForm.get('firstName').disable();
    this.updateForm.get('lastName').disable();
    this.updateForm.get('email').disable();
    this.updateForm.get('password').disable();
    this.updateForm.get('confirmPassword').disable();
    this.updateForm.get('mobile').disable();
    this.updateForm.get('address').disable();
    this.updateForm.get('speciality').disable();
    this.setDetails(this.doc2);
  }

  implementGoogleMapsAutocomplete() {
    /** The implementation of autocomplete was a combination from
     https://stackoverflow.com/questions/53894400/angular-7-use-import-googlemaps
     and https://stackoverflow.com/questions/51084724/types-googlemaps-index-d-ts-is-not-a-module **/
    const autocomplete = new google.maps.places.Autocomplete((<HTMLInputElement>document.getElementById('address')));
    console.log('Input: ', autocomplete);
    // Event listener to monitor place changes in the input
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      // Emit the new address object for the updated place
      const place = autocomplete.getPlace();
      this.completeAddressString = (place.formatted_address).toString();
      this.userLatitude = place.geometry.location.lat().toString();
      this.userLongitude = place.geometry.location.lng().toString();
      console.log('Place', autocomplete.getPlace());
      console.log('lang:', this.userLatitude);
      console.log('long:', this.userLongitude);
      this.updateForm.get('address').setValue(this.completeAddressString);
    });
  }


  setDetails(doc: Doctor) {
    console.log('Doctor', doc);
    this.docprofileservice.setDetails(doc).subscribe();

  }

  cancel() {
    this.disableButtons = true;

    this.docprofileservice.getDocDetails(this.userEmail).subscribe(data => {
      this.doc1 = data;
      console.log(this.doc1);
      this.updateForm.get('firstName').setValue(this.doc1.firstName);
      this.updateForm.get('lastName').setValue(this.doc1.lastName);
      this.updateForm.get('email').setValue(this.doc1.email);
      this.updateForm.get('password').setValue('');
      this.updateForm.get('confirmPassword').setValue('');
      this.updateForm.get('mobile').setValue(this.doc1.contactNumber);
      this.updateForm.get('address').setValue(this.doc1.address);
      this.updateForm.get('speciality').setValue(this.doc1.speciality);
    });

    this.updateForm.get('firstName').disable();
    this.updateForm.get('lastName').disable();
    this.updateForm.get('email').disable();
    this.updateForm.get('password').disable();
    this.updateForm.get('confirmPassword').disable();
    this.updateForm.get('mobile').disable();
    this.updateForm.get('address').disable();
    this.updateForm.get('speciality').disable();
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
