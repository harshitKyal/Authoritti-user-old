import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IntroDetailPage } from './intro-detail.page';

describe('IntroDetailPage', () => {
  let component: IntroDetailPage;
  let fixture: ComponentFixture<IntroDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IntroDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
