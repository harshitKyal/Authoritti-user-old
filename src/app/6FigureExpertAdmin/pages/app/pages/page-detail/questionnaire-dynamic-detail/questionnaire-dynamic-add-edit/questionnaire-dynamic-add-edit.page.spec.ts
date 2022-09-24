import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionnaireDynamicAddEditPage } from './questionnaire-dynamic-add-edit.page';

describe('DynamicQuestionnaireAddEditPage', () => {
  let component: QuestionnaireDynamicAddEditPage;
  let fixture: ComponentFixture<QuestionnaireDynamicAddEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnaireDynamicAddEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionnaireDynamicAddEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
