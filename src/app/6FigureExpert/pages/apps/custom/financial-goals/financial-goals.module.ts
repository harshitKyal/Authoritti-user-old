import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";


const routes:Routes = [
	{path: '', redirectTo: 'start', pathMatch: 'full'},
	{
		path        : 'start',
		loadChildren: () => import('../../start/start.module').then(m => m.StartPageModule)
	},
	{
		path        : 'intro/:id',
		loadChildren: () => import('../../intro/intro.module').then(m => m.IntroPageModule)
	},
	{
		path    : 'questionnaire',
		children: [
			{
				path        : 'annual-goal',
				loadChildren: () => import('./pages/annual-goal/annual-goal.module').then(m => m.AnnualGoalPageModule)
			},
			{
				path        : 'average-sale-price',
				loadChildren: () => import('./pages/average-sale-price/average-sale-price.module').then(m => m.AverageSalePricePageModule)
			},
			{
				path        : 'average-sale-required',
				loadChildren: () => import('./pages/average-sale-required/average-sale-required.module').then(m => m.AverageSaleRequiredPageModule)
			},
			{
				path        : 'sale-conversion',
				loadChildren: () => import('./pages/sale-conversion/sale-conversion.module').then(m => m.SaleConversionPageModule)
			},
			{
				path        : 'leads-required',
				loadChildren: () => import('./pages/leads-required/leads-required.module').then(m => m.LeadsRequiredPageModule)
			},
			{
				path        : 'tasks',
				loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksPageModule)
			},
			{
				path        : 'summary',
				loadChildren: () => import('./pages/summary/summary.module').then(m => m.SummaryPageModule)
			},
		],
	},
	{
		path        : 'report',
		loadChildren: () => import('../../report/report.module').then(m => m.ReportPageModule)
	},
];


@NgModule({
	declarations: [],
	imports     : [
		CommonModule,
		RouterModule.forChild(routes),
	]
})
export class FinancialGoalsModule
{
}
