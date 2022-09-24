import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {QuestionnaireePage} from './questionnairee.page';
import {ComponentsModule} from "../../../components/components.module";
import {ResolvePageDynamicGuard} from "../../../gaurds/resolve/resolve-page-dynamic.guard";


const routes:Routes = [
	{
		path     : '',
		component: QuestionnaireePage,
		resolve  : {page_info: ResolvePageDynamicGuard}
	}
];


@NgModule({
	imports     : [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		ComponentsModule
	],
	declarations: [QuestionnaireePage]
})
export class QuestionnaireeModule
{
}
