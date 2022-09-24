import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {GroupAddEditPage} from './group-add-edit.page';
import {ResolveGroupAddEditGuard} from "../../../../gaurds/resolve/group/resolve-group-add-edit-guard.service";


const routes:Routes = [
	{
		path     : '',
		component: GroupAddEditPage,
		resolve  : {group_info: ResolveGroupAddEditGuard}
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
	declarations: [GroupAddEditPage]
})
export class GroupAddEditPageModule
{
}
