import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {QuestionAddEditPage} from './question-add-edit.page';
import {ComponentsModule} from "../../../../../../../components/components.module";
import {ResolveQuestionAddEditGuard} from "../../../../../../../gaurds/resolve/question/resolve-question-add-edit.guard";
import {PipesModule} from "../../../../../../../../pipes/pipes.module";


const routes:Routes = [
	{
		path     : '',
		component: QuestionAddEditPage,
		resolve  : {question_info: ResolveQuestionAddEditGuard}
	}
];


@NgModule({
	imports     : [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule,
		ComponentsModule,
		PipesModule,
	],
	declarations: [QuestionAddEditPage]
})
export class QuestionAddEditPageModule
{
}
