import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {QuestionnaireDynamicDetailPage} from './questionnaire-dynamic-detail.page';
import {RouterModule, Routes} from "@angular/router";
import {ResolvePageDetailGuard} from "../../../../../gaurds/resolve/page/resolve-page-detail.guard";
import {PipesModule} from "../../../../../../pipes/pipes.module";


const routes:Routes = [
	{
		path     : '',
		component: QuestionnaireDynamicDetailPage,
		resolve  : {page_info: ResolvePageDetailGuard},
	},
	{
		path        : 'question-dynamic-add',
		loadChildren: () => import('./questionnaire-dynamic-add-edit/questionnaire-dynamic-add-edit.module').then(m => m.QuestionnaireDynamicAddEditPageModule),
	},
	{
		path        : 'question-dynamic-edit/:question_id',
		loadChildren: () => import('./questionnaire-dynamic-add-edit/questionnaire-dynamic-add-edit.module').then(m => m.QuestionnaireDynamicAddEditPageModule),
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
	declarations: [QuestionnaireDynamicDetailPage]
})
export class QuestionnaireDynamicDetailPageModule
{
}
