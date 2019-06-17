import {Component, OnInit} from '@angular/core';
import {NavbarService} from './navbar.service';
import {PatientNotif} from '../model/patientnotif.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NavbarService]

})
export class NavbarComponent implements OnInit {
  constructor(private navbarservice: NavbarService, private router: Router) {
  }

  public pnotifications = [];
  public count: number;
  public patientnotifmodel: PatientNotif;

  ngOnInit() {
    this.patientnotifmodel = new PatientNotif();
    const userData = (localStorage.getItem('userDetail'));
    const userObject = JSON.parse(userData);

    if (userObject.userID !== undefined) {
      this.patientnotifmodel.patient_Id = userObject.userID;
      this.navbarservice.GetPatientNotif(this.patientnotifmodel.patient_Id)
        .subscribe((data) => {
          this.pnotifications = data;
          console.log(this.pnotifications.length);
          // this.test = this.notifications[0].firstName;
        });
      this.count = this.pnotifications.length;
    }
  }

  Logout(): void {
    localStorage.clear();
    this.router.navigate(['/signupin']);
  }

}
