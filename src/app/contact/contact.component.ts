import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm = new FormGroup({
    contactName: new FormControl('', Validators.required),
    contactEmail: new FormControl('', [Validators.required, Validators.email]),
    contactPhone: new FormControl('', Validators.required)
  }); // https://angular.io/api/forms/FormControl
  navbar_solid: string;

  constructor() {
  }

  ngOnInit() {
    this.navbar_solid = 'navbar_solid';

  }
}

