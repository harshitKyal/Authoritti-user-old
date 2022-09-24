import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {TabsPage} from './tabs.page';
import {RouterModule, Routes} from "@angular/router";


const routes:Routes = [
	{
		path     : '',
		component: TabsPage,
		children : [
			{path: '', redirectTo: "pages", pathMatch: 'full'},
			{
				path    : "pages",
				children: [
					{
						path        : '',
						loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule),
					}
				]
			},
			{
				path    : "categories",
				children: [
					{
						path        : '',
						loadChildren: () => import('../categories/categories.module').then(m => m.CategoriesModule),
					}
				]
			},
			{
				path    : "groups",
				children: [
					{
						path        : '',
						loadChildren: () => import('../groups/groups.module').then(m => m.GroupsModule),
					}
				]
			},
		]
	}
];


@NgModule({
	imports     : [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes)
	],
	declarations: [TabsPage]
})
export class TabsPageModule
{
}
