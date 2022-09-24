import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";


const routes:Routes = [
	{path: '', redirectTo: 'page-list', pathMatch: 'full'},
	{
		path        : 'page-list',
		loadChildren: () => import('./page-list/page-list.module').then(m => m.PageListModule),
	},
	{
		path        : 'intro-detail/:page_id',
		loadChildren: () => import('./page-detail/intro-detail/intro-detail.module').then(m => m.IntroDetailPageModule),
	},
	{
		path        : 'questionnaire-detail/:page_id',
		loadChildren: () => import('./page-detail/questionnaire-detail/questionnaire-detail.module').then(m => m.QuestionnaireDetailModule),
	},
	{
		path        : 'questionnaire-dynamic-detail/:page_id',
		loadChildren: () => import('./page-detail/questionnaire-dynamic-detail/questionnaire-dynamic-detail.module').then(m => m.QuestionnaireDynamicDetailPageModule),
	},
	{
		path        : 'report-detail/:page_id',
		loadChildren: () => import('./page-detail/report-detail/report-detail.module').then(m => m.ReportDetailPageModule),
	},
	{
		path        : 'page-add',
		loadChildren: () => import('./page-add-edit/page-add-edit.module').then(m => m.PageAddEditModule),
	},
	{
		path        : 'page-edit/:page_id',
		loadChildren: () => import('./page-add-edit/page-add-edit.module').then(m => m.PageAddEditModule),
	},
];


@NgModule({
	declarations: [],
	imports     : [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class PagesModule
{
}
