import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {StartPage} from './start.page';
import {ComponentsModule} from "../../../components/components.module";
import {ResolveAppInfoGuard} from "../../../gaurds/resolve/resolve-app-info.guard";
import {PipesModule} from "../../../../pipes/pipes.module";


const routes:Routes = [
	{
		path     : '',
		component: StartPage,
		resolve  : {app_info: ResolveAppInfoGuard}
	}
];


@NgModule({
	imports     : [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		ComponentsModule,
		PipesModule,
	],
	declarations: [
		StartPage,
	]
})
export class StartPageModule
{
}
