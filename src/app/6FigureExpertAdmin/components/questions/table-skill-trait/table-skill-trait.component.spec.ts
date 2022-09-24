import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TableSkillTraitComponent } from './table-skill-trait.component';

describe('TableSkillTraitComponent', () => {
  let component: TableSkillTraitComponent;
  let fixture: ComponentFixture<TableSkillTraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSkillTraitComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TableSkillTraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
