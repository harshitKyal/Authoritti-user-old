import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {QuestionnaireDetailPage} from './questionnaire-detail.page';
import {ResolvePageDetailGuard} from "../../../../../gaurds/resolve/page/resolve-page-detail.guard";
import {PipesModule} from "../../../../../../pipes/pipes.module";


const routes:Routes = [
	{
		path     : '',
		component: QuestionnaireDetailPage,
		resolve  : {page_info: ResolvePageDetailGuard},
	},
	{
		path        : 'question-add',
		loadChildren: () => import('./question/question-add-edit/question-add-edit.module').then(m => m.QuestionAddEditPageModule),
	},
	{
		path        : 'question-edit/:question_id',
		loadChildren: () => import('./question/question-add-edit/question-add-edit.module').then(m => m.QuestionAddEditPageModule),
	},
];


@NgModule({
	imports     : [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		PipesModule
	],
	declarations: [QuestionnaireDetailPage]
})
export class QuestionnaireDetailModule
{
}
