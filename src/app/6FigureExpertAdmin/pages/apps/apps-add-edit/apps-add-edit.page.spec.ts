import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsAddEditPage } from './apps-add-edit.page';

describe('AppsAddEditPage', () => {
  let component: AppsAddEditPage;
  let fixture: ComponentFixture<AppsAddEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsAddEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsAddEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
