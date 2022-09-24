import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SliderComponent} from './questions/slider/slider.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShowMoreComponent} from './popovers/show-more/show-more.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {ReportsModule} from './reports/reports.module';
import {TextInputComponent} from './questions/text-input/text-input.component';
import {CheckComponent} from './questions/check/check.component';
import {MultiTextInputComponent} from './questions/multi-text-input/multi-text-input.component';
import {RadioComponent} from './questions/radio/radio.component';
import {TextAreaComponent} from './questions/text-area/text-area.component';
import {TableYesNoComponent} from './questions/table-yes-no/table-yes-no.component';
import {TableDropDownComponent} from './questions/table-drop-down/table-drop-down.component';
import {CheckGroupComponent} from './questions/check-group/check-group.component';
import {TableSkillComponent} from './questions/table-skill/table-skill.component';
import {TableTraitComponent} from './questions/table-trait/table-trait.component';
import {TableSkillTraitComponent} from './questions/table-skill-trait/table-skill-trait.component';
import {PlayVideoComponent} from './popovers/play-video/play-video.component';
import {EmbedVideo} from 'ngx-embed-video';


@NgModule({
     declarations   : [
          HeaderComponent,
          FooterComponent,

          SliderComponent,
          TextInputComponent,
          CheckComponent,
          MultiTextInputComponent,
          RadioComponent,
          TextAreaComponent,
          TableYesNoComponent,
          TableDropDownComponent,
          CheckGroupComponent,
          TableSkillComponent,
          TableTraitComponent,
          TableSkillTraitComponent,

          ShowMoreComponent,
          PlayVideoComponent,
     ],
     entryComponents: [
          ShowMoreComponent,
          PlayVideoComponent,
     ],
     imports        : [
          CommonModule,
          IonicModule,
          FormsModule,
          ReactiveFormsModule,
          ReportsModule,
          EmbedVideo.forRoot(),
     ],
     exports        : [
          HeaderComponent,
          FooterComponent,

          SliderComponent,
          TextInputComponent,
          CheckComponent,
          MultiTextInputComponent,
          RadioComponent,
          TextAreaComponent,
          TableYesNoComponent,
          TableDropDownComponent,
          CheckGroupComponent,
          TableSkillComponent,
          TableTraitComponent,
          TableSkillTraitComponent,

          ReportsModule,
     ]
})
export class ComponentsModule
{
}
