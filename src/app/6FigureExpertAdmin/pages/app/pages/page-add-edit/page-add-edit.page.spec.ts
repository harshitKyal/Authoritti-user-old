import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAddEditPage } from './page-add-edit.page';

describe('PageAddEditPage', () => {
  let component: PageAddEditPage;
  let fixture: ComponentFixture<PageAddEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAddEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAddEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
