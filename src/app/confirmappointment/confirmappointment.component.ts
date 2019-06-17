import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, NgForm, FormGroup} from '@angular/forms';
import {ConfirmAppointmentService} from './confirmappointment.service';
import {ConfirmAppointment} from '../model/confirmappointment.model';
import {ToastrService} from 'ngx-toastr';
import {ConnectcomponentService} from '../services/connectcomponentservice';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirmappointment',
  templateUrl: './confirmappointment.component.html',
  styleUrls: ['./confirmappointment.component.scss'],
  // Registering the service
  providers: [ConfirmAppointmentService]
})
export class ConfirmAppointmentComponent implements OnInit {
  // injecting service using the constructor
  constructor(private _confirmAppointmentService: ConfirmAppointmentService,
              private toast: ToastrService, private connectcomponentService: ConnectcomponentService
    , private router: Router) {
  }

  today: string;
  title = 'Book appointment';
  userLastName: string;
  userFirstName: string;
  userPhoneNumber: string;
  appointmentDate: Date;
  hideTimeSlots = true;
  isBlurTriggered = false;
  isSubmitted = false;
  selectedTimeSlot: Number;
  doctor_id: Number;
  isBooked: Boolean;
  selDoctorName: string;
  public bookingmodel: ConfirmAppointment;
  public doctorAvailSlots: ConfirmAppointment [] = [];
  bookingForm = new FormGroup({
    problemDesc: new FormControl('', [Validators.required]),
    appointmentDate: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.min(10)])
  });

  get problemDesc() {
    return this.bookingForm.get('problemDesc');
  }

  get appoinmentDate() {
    return this.bookingForm.get('appointmentDate');
  }

  get phoneNumber() {
    return this.bookingForm.get('phoneNumber');
  }

//  phoneNumber = new FormControl('', [ Validators.maxLength(10), Validators.min(10)]);
  ngOnInit() {
    const userData = (localStorage.getItem('userDetail'));
    const userObject = JSON.parse(userData);

    this.selDoctorName = this.connectcomponentService.selDoctorName;
    this.doctor_id = this.connectcomponentService.doctorId;

    this.today = new Date().toJSON().slice(0, 10).replace(/-/g,'-');

    this._confirmAppointmentService.getPatientDetails(userObject.email).subscribe(data => {
      console.log(data);
      this.userFirstName = data.firstName.toString();
      this.userLastName = data.lastName.toString();
      this.bookingForm.controls.phoneNumber.setValue(data.contactNumber);
    });
  }

  onAppointedDateChange(appointmentDate) {
    if (this.bookingForm.controls['appointmentDate'].value) {
      this.hideTimeSlots = false;
    } else {
      this.hideTimeSlots = true;
    }
    this.bookingmodel = new ConfirmAppointment();
    //   Author : Sarmad Noor
// Desc: value hardcoded as of now. Need to be taken from login feature.
    this.bookingmodel.doctor_Id = this.doctor_id;
    this.bookingmodel.appt_Date = this.bookingForm.controls['appointmentDate'].value;
    this._confirmAppointmentService.GetDoctorAvailability(this.bookingmodel.doctor_Id, this.bookingmodel.appt_Date)
      .subscribe((data) => {
        this.doctorAvailSlots = data;
        this.getAvailableSlots(data);
      });
    // console.log(this.doctorAvailSlots);
    console.log(appointmentDate);
    console.log(this.hideTimeSlots);
    console.log('doc name' + this.selDoctorName);
  }

  // Disabling already booked appointment
  getAvailableSlots(docAvail: ConfirmAppointment []): void {
  }

//   Author : Sarmad Noor
// Reference URL: https://stackoverflow.com/questions/46339025/angular-4-mobile-number-validation
// https://angular.io/guide/forms
// Desc- Validation for mobile number
  RestrictNumeral(event: any) {
    const pattern = /[0-9]/;
    this.isBlurTriggered = false;
    const inputPhoneNumber = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputPhoneNumber)) {
      event.preventDefault();
    }
  }

  checkPhoneNumber() {
    this.isBlurTriggered = true;
    this.isSubmitted = false;
    console.log('length', this.bookingForm.controls['phoneNumber'].value.length);
    console.log('value', this.bookingForm.controls['phoneNumber'].value);
  }

  confirmBooking(): void {
    if (this.isBlurTriggered) {
      this.isSubmitted = true;
    }
    this.bookingmodel = new ConfirmAppointment();
    this.bookingmodel.address = 'Almon';
    // this.bookingmodel.appt_Date = (this.bookingForm.controls['appointmentDate'].value);
    this.bookingmodel.appt_Date = this.bookingForm.controls['appointmentDate'].value;
    this.bookingmodel.problemDesc = this.bookingForm.controls.problemDesc.value;
    this.bookingmodel.appt_Status = 'Pending';
    //   Author : Sarmad Noor
// Desc: value hardcoded as of now. Need to be taken from login feature.
    const userData = (localStorage.getItem('userDetail'));
    console.log('local dat starts');
    console.log(JSON.parse(userData));
    const userObject = JSON.parse(userData);
    this.bookingmodel.doctor_Id = this.doctor_id;
    this.bookingmodel.patient_Id = userObject.userID;
    this.bookingmodel.slot_Id = this.selectedTimeSlot;
    console.log('button clicked' + this.bookingmodel.appt_Date);
    if (this.bookingmodel.slot_Id > 0) {
      this._confirmAppointmentService.InsertBookingDetail(this.bookingmodel).subscribe(x => this.NotifyUser(x));
    } else {
      this.toast.error('Please select the available time slot');
    }
  }

  bookSlot(slot_Id: Event): void {
    // this.slotString = (slot_Id.toString());
    this.selectedTimeSlot = Number(slot_Id.toString());
    console.log('slot selected' + this.selectedTimeSlot);
  }

  //   Author : Sarmad Noor
  // Callback function for service
  NotifyUser(isbooked: Boolean): void {
    if (isbooked) {
      this.ResetControl();
      this.toast.success('Your appointment has been booked successfully.');
      setTimeout(() => {
        this.router.navigate(['/myappointments']);
      }, 1000);
    } else {
      this.toast.error('Sorry unable to book appointment.Please try after some time');
    }
  }

//   Author : Sarmad Noor
// Desc: Method to reset the form and object
  ResetControl(): void {
    this.bookingForm.reset();
    this.bookingmodel = null;
    this.selectedTimeSlot = null;
    this.hideTimeSlots = true;
  }
}

