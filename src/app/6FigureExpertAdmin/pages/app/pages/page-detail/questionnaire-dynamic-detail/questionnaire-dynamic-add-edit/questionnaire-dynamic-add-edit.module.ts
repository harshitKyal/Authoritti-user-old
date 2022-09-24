import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {QuestionnaireDynamicAddEditPage} from './questionnaire-dynamic-add-edit.page';
import {RouterModule, Routes} from "@angular/router";
import {PipesModule} from "../../../../../../../pipes/pipes.module";
import {ComponentsModule} from "../../../../../../components/components.module";


const routes:Routes = [
	{
		path     : '',
		component: QuestionnaireDynamicAddEditPage,
	}
];


@NgModule({
	imports     : [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		PipesModule,
		ComponentsModule
	],
	declarations: [QuestionnaireDynamicAddEditPage]
})
export class QuestionnaireDynamicAddEditPageModule
{
}
