/// <reference types="@types/jquery" />
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-available-times',
  templateUrl: './available-times.component.html',
  styleUrls: ['./available-times.component.scss']
})
export class AvailableTimesComponent implements OnInit {
  @ViewChild('calendarInput', {read: ElementRef}) calendarInput: ElementRef;
  today: string;
  commonStartTime = '09:00:00';
  commonEndTime = '18:00:00';
  availabilityForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required])
  });

  constructor() {
  }

  ngOnInit() {
    this.today = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
    console.log(new Date().toJSON());

  }

}
