import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireePage } from './questionnairee.page';

describe('QuestionDynamicPage', () => {
  let component: QuestionnaireePage;
  let fixture: ComponentFixture<QuestionnaireePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnaireePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
