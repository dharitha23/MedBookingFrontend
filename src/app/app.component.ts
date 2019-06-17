import { Component, OnDestroy } from '@angular/core';
import {ApiService} from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'app';

  constructor(private apiService: ApiService) {
  }
  ngOnDestroy(): void {
    localStorage.clear();
    console.log('destroy is called');
    console.log(localStorage.getItem('userDetail'));
  }
}
