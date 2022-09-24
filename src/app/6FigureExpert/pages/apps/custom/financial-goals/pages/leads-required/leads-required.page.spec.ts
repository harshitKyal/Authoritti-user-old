import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeadsRequiredPage } from './leads-required.page';

describe('LeadsRequiredPage', () => {
  let component: LeadsRequiredPage;
  let fixture: ComponentFixture<LeadsRequiredPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadsRequiredPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeadsRequiredPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
