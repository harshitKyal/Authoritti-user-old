import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {GroupListPage} from './group-list.page';
import {RouterModule, Routes} from "@angular/router";


const routes:Routes = [
	{
		path     : '',
		component: GroupListPage,
	}
];


@NgModule({
	imports     : [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes)
	],
	declarations: [GroupListPage]
})
export class GroupListPageModule
{
}
