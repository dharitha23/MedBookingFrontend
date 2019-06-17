import { Component} from '@angular/core';
import {DocnavService} from './docnav.service';
import { DocNotif } from '../model/doctornotif.model';

@Component({
  selector: 'app-docnav',
  templateUrl: './docnav.component.html',
  styleUrls: ['./docnav.component.scss'],
  providers: [DocnavService]
})
export class DocnavComponent {

  public notifications = [];
  public test: string;
  public docnotifmodel: DocNotif;
  constructor(private docnavservice: DocnavService) { }

  showNotifications() {
    this.docnotifmodel = new DocNotif();
    const userData = (localStorage.getItem('userDetail'));
    const userObject = JSON.parse(userData);
    console.log(userObject);
    this.docnotifmodel.doctor_Id = userObject.userID;
    this.docnavservice.GetDoctorNotif(this.docnotifmodel.doctor_Id )
      .subscribe((data) => { this.notifications = data;
      console.log(this.notifications);
      // this.test = this.notifications[0].firstName;
      });

  }

}
