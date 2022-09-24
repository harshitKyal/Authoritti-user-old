import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmotionsPage } from './emotions.page';

describe('EmotionsPage', () => {
  let component: EmotionsPage;
  let fixture: ComponentFixture<EmotionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmotionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
