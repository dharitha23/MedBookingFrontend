import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isloggedIn = false;
  userType: string;

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  constructor() {
  }

  ngOnInit() {
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
  }

}
