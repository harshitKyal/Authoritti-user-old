import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAddEditPage } from './group-add-edit.page';

describe('GroupAddEditPage', () => {
  let component: GroupAddEditPage;
  let fixture: ComponentFixture<GroupAddEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupAddEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAddEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
