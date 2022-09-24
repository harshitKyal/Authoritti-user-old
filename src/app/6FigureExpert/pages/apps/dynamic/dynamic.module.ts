import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";


const routes:Routes = [
     {path: '', redirectTo: 'start', pathMatch: 'full'},

     {path: 'start', loadChildren: () => import('../start/start.module').then(m => m.StartPageModule)},
     {path: 'intro/:id', loadChildren: () => import('../intro/intro.module').then(m => m.IntroPageModule)},
     {path: 'section/:id', loadChildren: () => import('../section/section.module').then(m => m.SectionPageModule)},
     {path: 'questionnaire/:id', loadChildren: () => import('../questionnaire/questionnaire.module').then(m => m.QuestionnaireModule)},
     {path: 'questionnairee/:id', loadChildren: () => import('../questionnairee/questionnairee.module').then(m => m.QuestionnaireeModule)},
     {path: 'report', loadChildren: () => import('../report/report.module').then(m => m.ReportPageModule)},
     {
          path        : 'template/profession',
          loadChildren: () => import('../templates/profession/profession.module').then(m => m.ProfessionPageModule)
     },
     {
          path        : 'template/passion',
          loadChildren: () => import('../templates/passion/passion.module').then(m => m.PassionPageModule)
     },
     // {
     //      path        : 'template/goals',
     //      loadChildren: () => import('../templates/goals/goals.module').then(m => m.GoalsPageModule)
     // },
     {
          path        : 'template/emotions',
          loadChildren: () => import('../templates/emotions/emotions.module').then(m => m.EmotionsPageModule)
     },
];


@NgModule({
     declarations: [],
     imports     : [
          CommonModule,
          RouterModule.forChild(routes),
     ]
})
export class DynamicModule
{
}
