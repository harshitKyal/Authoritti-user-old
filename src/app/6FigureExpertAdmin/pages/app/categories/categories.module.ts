import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";


const routes:Routes = [
	{path: '', redirectTo: 'category-list', pathMatch: 'full'},

	{path: 'category-list', loadChildren: () => import('./category-list/category-list.module').then(m => m.CategoryListPageModule)},
	{path: 'category-add', loadChildren: () => import('./category-add-edit/category-add-edit.module').then(m => m.CategoryAddEditPageModule)},
	{path: 'category-edit/:category_id', loadChildren: () => import('./category-add-edit/category-add-edit.module').then(m => m.CategoryAddEditPageModule)},
];


@NgModule({
	declarations: [],
	imports     : [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class CategoriesModule
{
}
