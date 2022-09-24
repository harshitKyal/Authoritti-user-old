import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AverageSalePricePage } from './average-sale-price.page';

describe('AverageSalePricePage', () => {
  let component: AverageSalePricePage;
  let fixture: ComponentFixture<AverageSalePricePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AverageSalePricePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AverageSalePricePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
