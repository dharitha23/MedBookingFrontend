import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Router} from '@angular/router';
import {Doctor} from '../model/doctor';

@Component({
  selector: 'app-myreviews',
  templateUrl: './myreviews.component.html',
  styleUrls: ['./myreviews.component.scss']
})
export class MyreviewsComponent implements OnInit {
  doctor: Doctor;
  @ViewChild('mainSection', {read: ElementRef}) mainSection: ElementRef;
  navbar_solid: string;


  constructor(private router: Router, private apiService: ApiService) {
  }

  finishedDataRetrieval: boolean;

  ngOnInit() {
    this.navbar_solid = 'navbar_solid';
    this.finishedDataRetrieval = false;
    const userData = (localStorage.getItem('userDetail'));
    const userObject = JSON.parse(userData);
    const doctorId = userObject.userID;

    this.apiService.getDoctorById(doctorId)
      .subscribe(data => {
        this.doctor = data;
        this.finishedDataRetrieval = true;
        this.setSectionHeight();
        console.log(data);
      });
  }

  setSectionHeight() {
    if (this.doctor.rating_reviews.length >= 2) {
      $(this.mainSection.nativeElement).removeClass('my-appointments-full-page-section');
      $(this.mainSection.nativeElement).addClass('my_appointments_overflow');
    } else {
      $(this.mainSection.nativeElement).addClass('my-appointments-full-page-section');
      $(this.mainSection.nativeElement).removeClass('my_appointments_overflow');
    }
  }

}
