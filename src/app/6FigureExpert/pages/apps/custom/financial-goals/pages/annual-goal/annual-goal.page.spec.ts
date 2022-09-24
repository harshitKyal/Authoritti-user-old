import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnnualGoalPage } from './annual-goal.page';

describe('AnnualGoalPage', () => {
  let component: AnnualGoalPage;
  let fixture: ComponentFixture<AnnualGoalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualGoalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnnualGoalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
