import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserAddEditPage } from './user-add-edit.page';

describe('UserAddEditPage', () => {
  let component: UserAddEditPage;
  let fixture: ComponentFixture<UserAddEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserAddEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
