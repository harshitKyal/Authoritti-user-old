import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CategoryListPage} from './category-list.page';
import {RouterModule, Routes} from "@angular/router";


const routes:Routes = [
	{
		path     : '',
		component: CategoryListPage,
	}
];


@NgModule({
	imports     : [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes)
	],
	declarations: [CategoryListPage]
})
export class CategoryListPageModule
{
}
