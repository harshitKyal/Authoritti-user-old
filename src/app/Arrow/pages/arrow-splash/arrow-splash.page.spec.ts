import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowSplashPage } from './arrow-splash.page';

describe('SplashPage', () => {
  let component: ArrowSplashPage;
  let fixture: ComponentFixture<ArrowSplashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArrowSplashPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowSplashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
