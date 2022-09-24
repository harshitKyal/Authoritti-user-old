import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PassionPage } from './passion.page';

describe('PassionPage', () => {
  let component: PassionPage;
  let fixture: ComponentFixture<PassionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PassionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
