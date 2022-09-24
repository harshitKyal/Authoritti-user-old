import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaleConversionPage } from './sale-conversion.page';

describe('SaleConversionPage', () => {
  let component: SaleConversionPage;
  let fixture: ComponentFixture<SaleConversionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleConversionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaleConversionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
