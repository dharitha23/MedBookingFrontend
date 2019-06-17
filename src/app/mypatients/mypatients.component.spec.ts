import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {MatTableDataSource} from '@angular/material';

import { MypatientsComponent } from './mypatients.component';

describe('MypatientsComponent', () => {
  let component: MypatientsComponent;
  let fixture: ComponentFixture<MypatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
