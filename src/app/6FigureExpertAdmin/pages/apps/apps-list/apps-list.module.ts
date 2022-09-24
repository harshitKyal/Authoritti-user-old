import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {AppsListPage} from './apps-list.page';
import {ResolveAppListGuard} from "../../../gaurds/resolve/app/resolve-app-list.guard";
import {PipesModule} from "../../../../pipes/pipes.module";


const routes:Routes = [
	{
		path     : '',
		component: AppsListPage,
		resolve  : {apps: ResolveAppListGuard}
	}
];


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		PipesModule
	],
	declarations: [AppsListPage]
})
export class AppsListPageModule
{
}
