import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ReportDetailPage} from './report-detail.page';
import {RouterModule, Routes} from "@angular/router";
import {ResolvePageDetailGuard} from "../../../../../gaurds/resolve/page/resolve-page-detail.guard";
import {PipesModule} from "../../../../../../pipes/pipes.module";


const routes:Routes = [
	{
		path     : '',
		component: ReportDetailPage,
		resolve  : {page_info: ResolvePageDetailGuard},
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
	declarations: [ReportDetailPage]
})
export class ReportDetailPageModule
{
}
