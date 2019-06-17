import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocMyAppointmentsComponent } from './doc-my-appointments.component';

describe('DocMyAppointmentsComponent', () => {
  let component: DocMyAppointmentsComponent;
  let fixture: ComponentFixture<DocMyAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocMyAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocMyAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
