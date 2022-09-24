import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {IntroComponent} from "./intro/intro.component";
import {QuestionnaireComponent} from "./questionnaire/questionnaire.component";
import {ReportComponent} from "./report/report.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../../../pipes/pipes.module";
import {QuestionnaireDynamicComponent} from "./questionnaire-dynamic/questionnaire-dynamic.component";
import {SectionComponent} from "./section/section.component";


@NgModule({
     declarations: [
          IntroComponent,
          QuestionnaireComponent,
          QuestionnaireDynamicComponent,
          ReportComponent,
          SectionComponent,
     ],
     imports     : [
          CommonModule,
          IonicModule,
          ReactiveFormsModule,
          FormsModule,
          PipesModule,
     ],
     exports     : [
          IntroComponent,
          QuestionnaireComponent,
          QuestionnaireDynamicComponent,
          ReportComponent,
          SectionComponent,
     ]
})
export class PageComponentsModule
{
}
