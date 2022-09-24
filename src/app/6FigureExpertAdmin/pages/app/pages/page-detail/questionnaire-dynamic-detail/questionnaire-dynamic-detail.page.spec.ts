import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionnaireDynamicDetailPage } from './questionnaire-dynamic-detail.page';

describe('DynamicQuestionnaireDetailPage', () => {
  let component: QuestionnaireDynamicDetailPage;
  let fixture: ComponentFixture<QuestionnaireDynamicDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnaireDynamicDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionnaireDynamicDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
