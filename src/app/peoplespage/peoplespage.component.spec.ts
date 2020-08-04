import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplespageComponent } from './peoplespage.component';

describe('PeoplespageComponent', () => {
  let component: PeoplespageComponent;
  let fixture: ComponentFixture<PeoplespageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeoplespageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeoplespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
