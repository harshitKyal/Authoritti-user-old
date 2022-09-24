import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AverageSaleRequiredPage } from './average-sale-required.page';

describe('AverageSaleRequiredPage', () => {
  let component: AverageSaleRequiredPage;
  let fixture: ComponentFixture<AverageSaleRequiredPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AverageSaleRequiredPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AverageSaleRequiredPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
