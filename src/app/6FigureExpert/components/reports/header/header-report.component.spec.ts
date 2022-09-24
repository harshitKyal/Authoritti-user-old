import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderReportComponent } from './header-report.component';

describe('HeaderReportComponent', () => {
  let component: HeaderReportComponent;
  let fixture: ComponentFixture<HeaderReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderReportComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
