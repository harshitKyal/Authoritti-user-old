import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EgotisticComponent } from './egotistic.component';

describe('EgotisticComponent', () => {
  let component: EgotisticComponent;
  let fixture: ComponentFixture<EgotisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgotisticComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EgotisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
