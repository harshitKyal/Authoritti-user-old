import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";


const routes:Routes = [
	{path: '', redirectTo: 'app-list', pathMatch: 'full'},

	{path: 'app-list', loadChildren: () => import('./apps-list/apps-list.module').then(m => m.AppsListPageModule)},
	{path: 'app-add', loadChildren: () => import('./apps-add-edit/apps-add-edit.module').then(m => m.AppsAddEditPageModule)},
	{path: 'app-edit/:app_id', loadChildren: () => import('./apps-add-edit/apps-add-edit.module').then(m => m.AppsAddEditPageModule)},
];


@NgModule({
	declarations: [],
	imports     : [
		CommonModule,
		RouterModule.forChild(routes),
	]
})
export class AppsModule
{
}
