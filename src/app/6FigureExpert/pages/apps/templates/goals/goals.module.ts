import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {GoalsPage} from './goals.page';
import {RouterModule, Routes} from "@angular/router";
import {ComponentsModule} from "../../../../components/components.module";
import {PipesModule} from "../../../../../pipes/pipes.module";
import {AddEditGoalComponent} from "./modals/add-edit-goal/add-edit-goal.component";
import {AddEditStepComponent} from "./modals/add-edit-step/add-edit-step.component";
import {ResolvePageGuard} from "../../../../gaurds/resolve/resolve-page.guard";


const routes:Routes = [
	{
		path     : '',
		component: GoalsPage,
		resolve  : {page_info: ResolvePageGuard}
	}
];


@NgModule({
	imports        : [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		ComponentsModule,
		PipesModule,
	],
	declarations   : [
		GoalsPage,
		AddEditGoalComponent,
		AddEditStepComponent
	],
	entryComponents: [
		AddEditGoalComponent,
		AddEditStepComponent
	]
})
export class GoalsPageModule
{
}
