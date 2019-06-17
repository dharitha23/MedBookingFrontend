import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-default-nav',
  templateUrl: './default-nav.component.html',
  styleUrls: ['./default-nav.component.scss']
})
export class DefaultNavComponent implements OnInit {
  @Input() navbar_solid_class: string;

  constructor() { }

  ngOnInit() {

  }

}
