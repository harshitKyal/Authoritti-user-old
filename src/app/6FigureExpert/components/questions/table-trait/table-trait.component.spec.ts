import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TableTraitComponent } from './table-trait.component';

describe('TableTraitComponent', () => {
  let component: TableTraitComponent;
  let fixture: ComponentFixture<TableTraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTraitComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TableTraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
