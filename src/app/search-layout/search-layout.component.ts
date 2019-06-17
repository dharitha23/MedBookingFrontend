import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-search-layout',
  templateUrl: './search-layout.component.html',
  styleUrls: ['./search-layout.component.scss']
})
export class SearchLayoutComponent implements OnInit {
  navbar_solid: string;
  constructor() { }

  ngOnInit() {
    this.navbar_solid = 'navbar_solid';

  }

}
