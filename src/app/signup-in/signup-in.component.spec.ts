import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupInComponent } from './signup-in.component';

describe('SignupInComponent', () => {
  let component: SignupInComponent;
  let fixture: ComponentFixture<SignupInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
