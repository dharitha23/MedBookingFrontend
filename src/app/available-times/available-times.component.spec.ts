import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTimesComponent } from './available-times.component';

describe('AvailableTimesComponent', () => {
  let component: AvailableTimesComponent;
  let fixture: ComponentFixture<AvailableTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
