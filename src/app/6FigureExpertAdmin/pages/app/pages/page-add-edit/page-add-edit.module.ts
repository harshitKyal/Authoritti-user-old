import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PageAddEditPage} from './page-add-edit.page';
import {ResolvePageAddEditGuard} from "../../../../gaurds/resolve/page/resolve-page-add-edit.guard";
import {ComponentsModule} from "../../../../components/components.module";
import {PipesModule} from "../../../../../pipes/pipes.module";


const routes:Routes = [
	{
		path     : '',
		component: PageAddEditPage,
		resolve  : {page_info: ResolvePageAddEditGuard}
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
		PipesModule
	],
	declarations: [PageAddEditPage]
})
export class PageAddEditModule
{
}
