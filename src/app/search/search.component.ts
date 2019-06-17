/// <reference types="@types/googlemaps" />
/// <reference types="@types/jquery" />
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Doctor} from '../model/doctor';
import {ApiService} from '../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConnectcomponentService} from '../services/connectcomponentservice';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';

// @ts-ignore
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  // https://blog.angular-university.io/angular-viewchild/
  @ViewChild('mainNav', {read: ElementRef}) mainNav: ElementRef;
  @ViewChild('address', {read: ElementRef}) address: ElementRef;
  @ViewChild('header', {read: ElementRef}) header: ElementRef;
  currentRate = 6;


  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService
    , private connectcomponentService: ConnectcomponentService, private dialog: MatDialog) {
  }

  doctors: Doctor[];
  searchForm: FormGroup;
  completeAddressString: String;
  userLatitude: String;
  userLongitude: String;
  search_error: boolean;
  search_in_process: boolean;
  no_results: boolean;

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      address: [''],
      speciality: [''],
      search_text: ['']
    });

    $(this.header.nativeElement).addClass('search-full-page-section');
    try {
      this.implementGoogleMapsAutocomplete();
    } catch (e) {
      console.log(e);
      this.openDialog('Error', 'There was an error. Please, try again later.');

    }
  }

  confirmBooking(doctor: Doctor): void {
    this.connectcomponentService.setDoctorName(doctor.firstName + ' ' + doctor.lastName);
    this.connectcomponentService.setDoctorId(doctor.id);
    if (localStorage.getItem('userDetail') === null) {
      this.openDialog('Info', 'Please sign in to confirm the booking.',
        true, 'Sign in', '/signupin');
    } else {
      this.router.navigate(['/confirmappointment']);
    }
  }


  onSubmit() {
    this.search_error = false;
    this.no_results = false;
    $(this.header.nativeElement).addClass('search-full-page-section');

    if ((this.searchForm.value.address.length === 0) &&
      (this.searchForm.value.speciality.length === 0) && (this.searchForm.value.search_text.length === 0)) {
      this.search_error = true;
      this.search_in_process = false;
      return false;
    }

    this.search_in_process = true;
    console.log(this.searchForm.value);

    const searchParams = {
      speciality: this.searchForm.value.speciality,
      searchText: this.searchForm.value.search_text + '',
      latitude: this.userLatitude + '',
      longitude: this.userLongitude + ''
    };
    console.log(searchParams);

    this.apiService.searchDoctors(searchParams)
      .subscribe(data => {
          this.search_in_process = false;
          this.doctors = data;
          if (this.doctors.length === 0) {
            this.no_results = true;
          }

          this.setHeaderHeight();
          console.log(data);

        },
        err => {
          console.log(err);
          this.openDialog('Error', 'There was an error. Please, try again later.');
        });
  }

  showDoctorInfo(doctor: Doctor): void {
    window.localStorage.removeItem('showDoctorInfoId');
    window.localStorage.setItem('showDoctorInfoId', doctor.id.toString());
    this.router.navigate(['search-result']);
  }

  implementGoogleMapsAutocomplete() {
    const searchForm = this.searchForm;
    /** The implementation of autocomplete was a combination from
     https://stackoverflow.com/questions/53894400/angular-7-use-import-googlemaps
     and https://stackoverflow.com/questions/51084724/types-googlemaps-index-d-ts-is-not-a-module **/
    const autocomplete = new google.maps.places.Autocomplete(this.address.nativeElement);
    console.log('Input: ', autocomplete);
    // Event listener to monitor place changes in the input
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      // Emit the new address object for the updated place
      const place = autocomplete.getPlace();
      // console.log('autocomplete.getPlace()', autocomplete.getPlace());
      this.completeAddressString = (place.formatted_address).toString();
      this.userLatitude = place.geometry.location.lat().toString();
      this.userLongitude = place.geometry.location.lng().toString();
      console.log('Place', autocomplete.getPlace());
      console.log('lang:', this.userLatitude);
      console.log('long:', this.userLongitude);

      searchForm.controls['address'].setValue(this.completeAddressString);
    });
  }

  detectLocation() {
    /** https://developers.google.com/maps/documentation/javascript/geolocation **/
    /** https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse **/
    const searchForm = this.searchForm;
    const geocoder = new google.maps.Geocoder;

    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by this browser.');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.userLatitude = (position.coords.latitude).toString();
        this.userLongitude = (position.coords.longitude).toString();
        console.log('lang: %s  long: %s', this.userLatitude, this.userLongitude);

        // https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse
        const latlng = {lat: parseFloat((position.coords.latitude).toString()), lng: parseFloat((position.coords.longitude).toString())};
        geocoder.geocode({'location': latlng}, function (results, status) {
          if (status.toString() === 'OK') {
            if (results[0]) {
              // https://stackoverflow.com/questions/35039610/manually-set-value-for-formbuilder-control
              searchForm.controls['address'].setValue(results[0].formatted_address);
            } else {
              this.openDialog('Info', 'No results found. Please, try again later.');
              console.log('No results found');
            }
          } else {
            this.openDialog('Error', 'There was an error. Please, try again later.');
            console.log('Geocoder failed due to: ' + status);
          }
        });
      });
    }
  }

  /** Original code taken from https://www.concretepage.com/angular-2/angular-2-ngstyle-and-style-binding-example */
  setDoctorProfilePicture(profile_pic_path) {
    const myStyles = {
      'background-image': profile_pic_path ? 'url(\'../../assets/' + profile_pic_path + '\')' : 'url(\'../../../assets/images/default-user.png\')'
    };
    return myStyles;
  }

  setHeaderHeight() {
    if (this.doctors.length >= 2) {
      $(this.header.nativeElement).removeClass('search-full-page-section');
      $(this.header.nativeElement).addClass('search_overflow');
    } else {
      $(this.header.nativeElement).addClass('search-full-page-section');
      $(this.header.nativeElement).removeClass('search_overflow');
    }
  }

  getAddressMapsURL(latitude, longitude) {
    return 'https://www.google.com/maps/search/?api=1&query=' + latitude + ',' + longitude;
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
