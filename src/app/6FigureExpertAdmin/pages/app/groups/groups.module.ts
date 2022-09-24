import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";


const routes:Routes = [
	{path: '', redirectTo: 'group-list', pathMatch: 'full'},

	{path: 'group-list', loadChildren: () => import('./group-list/group-list.module').then(m => m.GroupListPageModule)},
	{path: 'group-add', loadChildren: () => import('./group-add-edit/group-add-edit.module').then(m => m.GroupAddEditPageModule)},
	{path: 'group-edit/:group_id', loadChildren: () => import('./group-add-edit/group-add-edit.module').then(m => m.GroupAddEditPageModule)},
];


@NgModule({
	declarations: [],
	imports     : [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class GroupsModule
{
}
