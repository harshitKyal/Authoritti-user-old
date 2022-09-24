import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ReportPage} from './report.page';
import {ComponentsModule} from "../../../components/components.module";
import {ResolveReportGuard} from "../../../gaurds/resolve/resolve-report.guard";


const routes:Routes = [
	{
		path     : '',
		component: ReportPage,
		resolve  : {page_info: ResolveReportGuard}
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
	declarations: [ReportPage]
})
export class ReportPageModule
{
}
