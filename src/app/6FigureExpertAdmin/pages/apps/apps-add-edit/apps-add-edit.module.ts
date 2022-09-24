import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {AppsAddEditPage} from './apps-add-edit.page';
import {ResolveAppAddEditGuard} from "../../../gaurds/resolve/app/resolve-app-add-edit.guard";


const routes:Routes = [
	{
		path     : '',
		component: AppsAddEditPage,
		resolve  : {app_info: ResolveAppAddEditGuard}
	}
];


@NgModule({
	imports     : [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule,
	],
	declarations: [AppsAddEditPage]
})
export class AppsAddEditPageModule
{
}
