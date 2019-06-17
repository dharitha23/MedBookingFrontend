import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Doctor} from '../model/doctor';
import {ApiService} from '../services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  doctor: Doctor;
  @ViewChild('mainSection', {read: ElementRef}) mainSection: ElementRef;
  navbar_solid: string;
  isloggedIn = false;
  userType: string;

  constructor(private router: Router, private apiService: ApiService) {
  }

  finishedDataRetrieval: boolean;

  ngOnInit() {
    this.navbar_solid = 'navbar_solid';
    this.finishedDataRetrieval = false;
    const userDetail = localStorage.getItem('userDetail');
    if (userDetail === null) {
      console.log('user is not logged in');
      this.isloggedIn = false;
      console.log(this.isloggedIn);
      console.log(localStorage.getItem('userDetail'));
    } else {
      const userObject = JSON.parse(userDetail);
      console.log('user logged in');
      console.log(localStorage.getItem('userDetail'));
      this.isloggedIn = true;
      this.userType = userObject.type;
    }

    const doctorId = window.localStorage.getItem('showDoctorInfoId');
    if (!doctorId) {
      alert('Invalid action.');
      this.router.navigate(['app-search']);
      return;
    }

    $(this.mainSection.nativeElement).addClass('search-full-page-section');

    this.apiService.getDoctorById(doctorId)
      .subscribe(data => {
        this.doctor = data;
        this.finishedDataRetrieval = true;
        this.setSectionHeight();
        console.log(data);
      });
  }

  /** Original code taken from https://www.concretepage.com/angular-2/angular-2-ngstyle-and-style-binding-example */
  setDoctorProfilePicture(profile_pic_path) {
    const myStyles = {
      'background-image': profile_pic_path ? 'url(\'../../assets/' + profile_pic_path + '\')' : 'url(\'../../../assets/images/default-user.png\')'
    };
    return myStyles;
  }

 
  setSectionHeight() {
    if (this.doctor.rating_reviews.length >= 2) {
      $(this.mainSection.nativeElement).removeClass('search-full-page-section');
      $(this.mainSection.nativeElement).addClass('search_overflow');
    } else {
      $(this.mainSection.nativeElement).addClass('search-full-page-section');
      $(this.mainSection.nativeElement).removeClass('search_overflow');
    }
  }

}
