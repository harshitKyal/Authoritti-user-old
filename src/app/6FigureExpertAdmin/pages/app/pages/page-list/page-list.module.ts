import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PageListPage} from './page-list.page';
import {ResolvePageListGuard} from "../../../../gaurds/resolve/page/resolve-page-list.guard";
import {PipesModule} from "../../../../../pipes/pipes.module";


const routes:Routes = [
	{
		path     : '',
		component: PageListPage,
		resolve  : {pages: ResolvePageListGuard}
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
	declarations: [PageListPage]
})
export class PageListModule
{
}
