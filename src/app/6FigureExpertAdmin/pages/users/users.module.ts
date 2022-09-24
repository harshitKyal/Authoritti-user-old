import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";


const routes:Routes = [
	{path: '', redirectTo: 'user-list', pathMatch: 'full'},

	{path: 'user-list', loadChildren: () => import('./user-list/user-list.module').then(m => m.UserListPageModule)},
	{path: 'user-edit/:user_id', loadChildren: () => import('./user-add-edit/user-add-edit.module').then(m => m.UserAddEditPageModule)}
];


@NgModule({
	declarations: [],
	imports     : [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class UsersModule
{
}
