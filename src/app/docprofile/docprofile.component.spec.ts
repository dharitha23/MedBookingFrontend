import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocProfileComponent } from './docprofile.component';

describe('DocProfileComponent', () => {
  let component: DocProfileComponent;
  let fixture: ComponentFixture<DocProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
