import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CategoryAddEditPage} from './category-add-edit.page';
import {ResolveCategoryAddEditGuard} from "../../../../gaurds/resolve/category/resolve-category-add-edit.guard";


const routes:Routes = [
	{
		path     : '',
		component: CategoryAddEditPage,
		resolve  : {category_info: ResolveCategoryAddEditGuard}
	}
];


@NgModule({
	imports     : [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule
	],
	declarations: [CategoryAddEditPage]
})
export class CategoryAddEditPageModule
{
}
