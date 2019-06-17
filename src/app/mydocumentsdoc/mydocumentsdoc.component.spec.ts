import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MydocumentsdocComponent } from './mydocumentsdoc.component';

describe('MydocumentsdocComponent', () => {
  let component: MydocumentsdocComponent;
  let fixture: ComponentFixture<MydocumentsdocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydocumentsdocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MydocumentsdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
